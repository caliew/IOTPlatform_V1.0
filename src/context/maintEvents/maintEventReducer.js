import { SET_MAINTEVENTS, ADD_MAINTEVENT, DELETE_MAINTEVENT } from '../types';

export default (state, action) => {
  // -------------------
  switch (action.type) {
    case SET_MAINTEVENTS:
      return {
        ...state,
        maintEvents: action.payload
      }
    case ADD_MAINTEVENT:
      let _maintEvents = state.maintEvents;
      _maintEvents.push(action.payload);
      return {
        ...state,
        maintEvents:_maintEvents
      }
    case DELETE_MAINTEVENT:
      let _updatedEvents = state.maintEvents.filter(event => event.id !== action.payload);
      return {
        ...state,
        maintEvents: _updatedEvents
      }
    default:
      return state;
  }
};
