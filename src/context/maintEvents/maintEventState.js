import React, {useReducer} from 'react';
import axios from 'axios';
import MaintEventContext from './maintEventContext';
import MaintEventReducer from './maintEventReducer';
import {ADD_MAINTEVENT,UPDATE_MAINTEVENT,DELETE_MAINTEVENT, MAINTEVENT_ERROR, SET_MAINTEVENTS} from '../types';

const initialState = {
  maintEvents: []
};
// --------
const MaintEventState = props => {
  // -------------------
  const [state, dispatch] = useReducer(MaintEventReducer, initialState);
  // -----------------
  // GET NOTIFICATIONS
  // -----------------
  const getMaintEvents = (user) => {
    try {
      // -------------------------
      const params = { totalLines : 88, companyname: user.companyname, email: user.email };
      axios.get('/api/maintEvents', { params } ).then (res => {
        // -------
        console.log(`..MAINTEVENTSTATE.JS .. SET_MAINTEVENTS`);
        console.log(res.data);
        dispatch({
          type: SET_MAINTEVENTS,
          payload: res.data
        });
      }).catch ( err => {
        console.log(`..MAINTEVENTSTATE.JS .. MAINTEVENT_ERROR`);
        dispatch({
          type: MAINTEVENT_ERROR,
          payload: null
        });
      })
      // --------------
    } catch (err) {
    }    
  };
  // --------------------
  // ADD MAINTENANC EVENT
  // --------------------
  const addMaintEvent = async maintEvent => {
    // ---------------
    try {
      // -------
      console.log(`POST...API/MAINTEVENTS/ADD..${maintEvent}`)
      dispatch({
        type: ADD_MAINTEVENT,
        payload: maintEvent
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: MAINTEVENT_ERROR,
        payload: err.response.msg
      });
    }
  };
  const updateMaintEvent = async maintEvent => {
    // ---------------
    try {
      // -------
      console.log(`POST...API/MAINTEVENTS/UPDATE..${maintEvent}`)
      dispatch({
        type: UPDATE_MAINTEVENT,
        payload: maintEvent
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: MAINTEVENT_ERROR,
        payload: err.response.msg
      });
    }

  }
  const removeMaintEvent = async maintEvent => {
    // ---------------
    let _ObjMaintEvent = { id:maintEvent }
    // -------
    try {
      console.log(`POST...API/MAINTEVENTS/DELETE..${_ObjMaintEvent}`)
      dispatch({
        type: DELETE_MAINTEVENT,
        payload: maintEvent
      })
    } catch (err) {

    }
  };
  // -----
  return (
    <MaintEventContext.Provider
      value={{
        maintEvents: state.maintEvents,
        getMaintEvents,
        addMaintEvent,
        updateMaintEvent,
        removeMaintEvent
      }}>
      {props.children}
    </MaintEventContext.Provider>
  );
};

export default MaintEventState;
