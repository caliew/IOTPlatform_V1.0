import React, { useContext,useEffect,useState } from 'react';
import axios from 'axios';

import { MDBBtn } from "mdbreact";

const Test = () => {
  // ---------------
  const [rawdata,setData] = useState(null);
  // ------------
	useEffect(()=> {
    // ------------
    RELOADRAWDARA();
	},[])
  // ---------------
  const RELOADRAWDARA = () => {
    try {
      // --------------------------------
      axios.get('/api/sensors/rawsensordata', { } ).then (res => {
        console.log('....GET API/SENSORS/RAWSENSORDATA....')
        let DataMap = [];
        if (res.data) {
          Object.keys(res.data).forEach(key => {
            let _data = res.data[key];
            DataMap.push(_data)
          })
        }
        DataMap.sort(function(a,b) { 
          return a.DTUID - b.DTUID
        });
        setData(DataMap);
        // ----------------
      }).then( res => {
        // --------------    
        // getSensorsData();
        // --------------
      }).catch ( err => {
      })
    } catch (err) {
    }
    // ---------
  }
  function pad2(number) {
    return (number < 10 ? '0' : '') + number
  }
  function byteArray(dataArr) {
    let strTEXT ="";
    dataArr.forEach((_byte,index) => {
      strTEXT += _byte + " ";
    })
    return strTEXT;
  }
  // ------
  function getBYTESTRING(RCV_BYTES) {
    let strLINE = ``;
    RCV_BYTES.forEach(_BYTE => {
      strLINE += `${_BYTE} `
    })
    strLINE += ``;
    return strLINE;
  }
  // --------------------------------------------
	return (
    <main style={{ marginTop: '2rem' }}>
      <MDBBtn onClick={()=>RELOADRAWDARA()}>REFRESH</MDBBtn>
      <ul>
        {
          rawdata && rawdata.map((_sensor,index) => {
            return (<li>[{_sensor.TIMESTEMP}] &emsp; DTU={_sensor.DTUID}  &emsp; SENSOR ID={pad2(_sensor.SENSORID)} &emsp; 
                    BYTE_RCV={getBYTESTRING(_sensor.RCV_BYTES)} &emsp; DATA={byteArray(_sensor.sensorDataArr)} ..{_sensor.DATAS}</li>)
          })
        }
      </ul>
		</main>
	)
}

export default Test
