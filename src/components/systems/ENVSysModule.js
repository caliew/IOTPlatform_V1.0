import React, { useState, useEffect, useContext, Fragment } from 'react';
import SensorContext from '../../context/sensor/sensorContext';
import SensorList from './SensorList';
import { MDBTable,MDBTableBody,MDBRow,MDBCard, MDBCardTitle,MDBContainer, MDBCol  } from 'mdbreact';

import Thermometer from './Thermometer'
import TDKFloorPlan from './TDKFloorPlan';

import SparklinePlots from '../data-ui/SparklinePlots';

// https://jpg-svg.com/#
// https://imageresizer.com/transparent-background
// https://picsvg.com/
// https://products.aspose.app/svg/en/image-vectorization/view
// REFERENCE SVG DATA FROM 
// '../components/svg/TDK_ISOVIEW.svg'

let sensorLocationMap = {
  
	"B0-F8-97-C3-7C-87" : { name:"BACKEND #1", id:"B0-F8-97-C3-7C-87", x: 0.0, y: 0.0, reading:'' }, 
	"B0-C0-E7-11-A7-E3" : { name:"BACKEND #4", id:"B0-C0-E7-11-A7-E3", x: 50.0, y: 50.0, reading:'' }, 
	"B0-8A-EA-86-E2-C9" : { name:"HVC ROOM", id:"B0-8A-EA-86-E2-C9", x: 100.0, y: 100.0, reading:'' }, 
	"B0-68-61-5E-F9-72" : { name:"PASTE PREP ROOM", id:"B0-68-61-5E-F9-72", x: 20.0, y: 100.0, reading:'' }, 
  
	"B0-2F-E0-3F-DC-9B" : { name:"Channel 13", id:"B0-2F-E0-3F-DC-9B", x: 1020.0, y: 280.0, reading:'' }, 
	"B0-BC-82-C4-C4-41" : { name:"(Cold room)", id:"B0-BC-82-C4-C4-41", x: 1160.0, y: 380.0, reading:'' }, 
	"B0-B6-C7-46-4D-53" : { name:"Channel 11", id:"B0-B6-C7-46-4D-53", x: 1145.0, y: 320.0, reading:'' }, 
	"B0-F6-BF-85-9E-13" : { name:"Channel 10", id:"B0-F6-BF-85-9E-13",x: 1145.0, y: 270.0, reading:'' }, 
}

function ENVSysModule({ systemComponent, handleComponetSelection, type, userCompanyName }) {
    // -----------
    const [wiSensors, setWiSensor] = useState([]);
    const [sensorLabels, setSensorLabels] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [humdData, setHUmdData] = useState([]);
		const [plotDatas, setPlotDatas] = useState([]);
		// --------------------------------------------
    const sensorContext = useContext(SensorContext);
    const [showHide, setShowHide] = useState(true);
    const { sensors, getSensors } = sensorContext;
    // --------------
    useEffect(()=>{
        if (sensors === null) getSensors();
        abstactWiSensor();
    },[sensors])
    // ---------------------------
    const abstactWiSensor = () => {
			if (sensors === null) 
			return;
			// -----------------
			// ABSTRACT WISENSOR
			// -----------------
			let _wiSensors = [];
			let _sLabels = [];
			let _tempDatas = [];
			let _plotDatas = [];
			let _humdDatas = [];
      // ----------------------
			sensors.forEach( sensor => {
        // -----------------------
        if (sensor.type === 'WISENSOR') {
          let { datas } = getDatas(sensor);
          _wiSensors.push(sensor);
          _sLabels.push(sensor.name);
          _plotDatas.push(datas);
          sensor.logsdata[0] && _tempDatas.push(Number(sensor.logsdata[0].Temperature.toFixed(1)));
          sensor.logsdata[0] && _humdDatas.push(['HUMD',Number(sensor.logsdata[0].Humidity)]);
        };
        // ---------
        let ObjSensor = sensorLocationMap[sensor.sensorId];
        if (ObjSensor && ObjSensor.hasOwnProperty("reading")) {
          ObjSensor["reading"] = Number(sensor.logsdata[0].Temperature.toFixed(1));
          delete sensorLocationMap[sensor.name];
        }
        sensorLocationMap[sensor.sensorId] = ObjSensor;
        // -------------------
      });
      // --------------------
			setWiSensor(_wiSensors.sort(compareByName));
			setSensorLabels(_sLabels);
			setTempData(_tempDatas);
			setHUmdData(_humdDatas);
			setPlotDatas(_plotDatas);
    }
    // --------------
    const componentNames = {
        sysCHILLER : 'CHILLER',
        sysAHU : 'AHU',
        sysWCPU : 'WCPU',
        sysCTW : "CTW",
        pumpCHILLER : "CH PUMP",
        pumpCTW : "CTW PUMP",
        pumpAHU : "AHU PUMP"
    }
    // --------------------------------------------
    // fill='green' stroke='black' stroke-width='1'
    // width="645" height="459" viewBox="0 0 645 459"
    // --------------------------------------------
    return (
      <MDBRow center>

        {/* <MDBCard className="px-4 py-4 m-2" style={{width:`${MDBRowWidth()}px`}}> */}
            {/* width="700" height="534"  */}
            {/* { showHide && getFloorPlan() } */}
        {/* </MDBCard> */}

				<MDBCard className="p-3 m-2" style={{ width: "40rem" }}>
          <MDBCardTitle>ENV. TEMPERATURE</MDBCardTitle>
          <MDBTable striped small>
            <MDBTableBody>
            {
                wiSensors && wiSensors.sort().map( (sensor,index) => { return (<SensorList companyName={userCompanyName} sensor={sensor} index={index} />)})
            }
            </MDBTableBody>
          </MDBTable>
        </MDBCard>

        <MDBCard className="p-5 m-2" style={{ width: "40rem" }}>

          { showHide && sensorLabels && tempData && 
              getThemrmometer( 
                  { title : 'ENVIRONMENTS', 
                  sensors : sensorLabels, 
                  data : tempData, 
                  redFrom: 90, 
                  redTo: 100, 
                  yellowFrom: 75, 
                  yellowTo: 90,
                  minorTicks: 5})}
        </MDBCard>

      </MDBRow>
	)
}

// ------------
function getDatas(sensor) {
  // console.log(sensor.logsdata);
  let datas = [];
  let TempData = [];
  let HumdData = [];
  let maxTemp = -999;
  let maxHumd = -999;
  let maxTempDateTime;
  let maxHumdDateTime;
  let minTempDateTime;
  let minHumdDateTime;
  let rmsTemp = 0;
  let minTemp = 999;
  let minHumd = 999;
  sensor.logsdata.forEach( (data,index) => {
    let _Date = new Date(data.TIMESTAMP);
    let _timeLabel = _Date.toLocaleDateString([], {hour12: false,hour: "2-digit",minute: "2-digit"});
    // -------------------------------------------------
    if (data.Temperature > maxTemp) {
      maxTemp = data.Temperature;
      maxTempDateTime = _timeLabel;
    }
    if (data.Humidity > maxHumd) {
      maxHumd = data.Humidity;
      maxHumdDateTime = _timeLabel;
    }
    // -------------------------
    if (data.Temperature < minTemp) {
      minTemp = data.Temperature;
      minTempDateTime = _timeLabel;
    }
    if (data.Humidity < minHumd) {
      minHumd = data.Humidity;
      minHumdDateTime = _timeLabel;
    }
    // ----------------------------------------------
    TempData.push({y:data.Temperature,x:_timeLabel});
    HumdData.push({y:data.Humidity,x:_timeLabel})    
  })
  datas.push(TempData)
  datas.push(HumdData)
  return { datas,maxTempDateTime,minTempDateTime,maxHumdDateTime,minHumdDateTime,
           maxTemp,maxHumd,minTemp,minHumd,rmsTemp };
}
function compareByName(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
}
// -------------
// GET SVG MODEL
// -------------
const getSensorLocation = (prop) => {
  // ---------------
  let strLocation = '';
  if (sensorLocationMap.hasOwnProperty(prop)) {
    let ObjSensorLocation = sensorLocationMap[prop];
    if (ObjSensorLocation) strLocation = `translate(${ObjSensorLocation.x},${ObjSensorLocation.y})`;
  }
  return strLocation;
}
const getSensorTemperature = (prop) => {
  let TempReading = ''
  if (sensorLocationMap.hasOwnProperty(prop)) {
    let ObjSensorLocation = sensorLocationMap[prop];
    if(ObjSensorLocation) TempReading = ObjSensorLocation.reading;
  }
  return TempReading;
}
const getWiSensorHeatMapTag = (_wiSensor,index) => {
  // -----
  // console.log(getSensorLocation("B0-68-61-5E-F9-72"))
  // console.log(getSensorLocation("B0-2F-E0-3F-DC-9B"))
  // console.log(getSensorLocation("B0-F6-BF-85-9E-13"))
  // console.log(getSensorLocation("B0-B6-C7-46-4D-53"))
  // -----
  let colors = ['yellow','blue','green','orange']
  return (
    <Fragment>
      <g transform={getSensorLocation(_wiSensor.sensorId)} >
        <circle cx="0" cy="0" r="40" fill="green" filter="url(#heatMap)" />
        <circle cx="0" cy="0" r="20" fill={colors[index]} filter="url(#heatMap)" />
        {/* <circle cx="0" cy="0" r="15" fill="yellow" filter="url(#heatMap)" /> */}
        <circle cx="0" cy="0" r="1" fill="red" filter="url(#heatMap)" />
        <text x="0" y="0" font-size='1.2rem' fill="white">{getSensorTemperature(_wiSensor.sensorId)}</text>
      </g>
    </Fragment>
  )
}
const getRHHeatMap = (wiSensors) => {
	return (
		<Fragment>
			<def>
				<radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
						<stop offset="0%" style={{stopColor:'rgb(255,255,255)',stopOpacity:0}} />
						<stop offset="100%" style={{stopColor:'rgb(0,0,255)',stopOpacity:1}} />
				</radialGradient>
				<filter id="heatMap">
						{/* <!--Blur effect--> */}
						<feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
				</filter>
			</def>
      {
        wiSensors && wiSensors.map( (_wiSensor,index) => {
          return getWiSensorHeatMapTag(_wiSensor,index)
        })
      }
		</Fragment>
	)
}
const getAHULineMap = () => {
    return (
        <Fragment>
            {/* <!-- Simple color stroke --> */}
            {/* <!-- <circle cx="5" cy="5" r="4" fill="none" stroke="green" /> --> */}
            {/* <!-- Stroke a circle with a gradient --> */}
            <defs>
                <linearGradient id="myGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stop-color="blue" />
                <stop offset="50%"  stop-color="green" />
                <stop offset="100%" stop-color="yellow" />
                </linearGradient>
            </defs>
    <polyline points="120,70 220,70 470,70 470,430 220,430 220,350" stroke-width="20" fill="none" stroke="url(#myGradient1)" />
    <polyline points="320,80 320,180 150,180" stroke-width="20" fill="none" stroke="green"/>
    <polyline points="470,250 150,250" stroke-width="20" fill="none" stroke="yellow"/>
        </Fragment>
    )

}
const getThemrmometer = (data) => {
  return (
    // <div className="d-flex row p-4 justify-content-center">
    <MDBRow>

        {
          data.data.map( (tempReading,index) => (
            <MDBCol md="3">
            {/* <div className="d-flex flex-column px-4 align-items-center " > */}
                <Thermometer reverseGradient='true' theme="dark" value={tempReading} max="35" steps="1" format="°C" size="small" height="100" />
                <p>{data.sensors[index]}</p>
            {/* </div> */}
            </MDBCol>
          ))
        }

     {/* </div> */}
    </ MDBRow>

  )
}

// Set default props
ENVSysModule.defaultProps = {
  color: "black",
  handleComponetSelection: null,
  title:'PRODUCTION FLOOR PLAN'
};
export default ENVSysModule