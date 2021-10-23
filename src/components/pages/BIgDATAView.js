import React, { useState,useContext } from 'react'

import SensorContext from '../../context/sensor/sensorContext';
import { MDBContainer } from 'mdbreact';
import TDK_HVAC_PlanView from '../systems/svg/TDK_HVAC_PlanView';
import TDK_HVAC_IsoView from '../systems/svg/TDK_HVAC_IsoView';
import DataV from '../datav'

const BigDATAView = () => {
  // -----------
  const sensorContext = useContext(SensorContext);  
  const { filterSensors, sensorsData, getSensorsData, clearFilter, filtered } = sensorContext;

  return (
    <div class="container-fluid">
      {/* <DataV /> */}
        <p>TDK ELECTRONICS JOHOR PLANT</p>
        <TDK_HVAC_IsoView color='black' sensorsData={sensorsData}/>
        {/* <TDK_HVAC_IsoView color='black' sensorsData={sensorsData}/> */}
        {/* <TDK_HVAC_PlanView sensorsData={sensorsData} model='4' color='black' />       */}
    </div>
  )
}

export default BigDATAView
