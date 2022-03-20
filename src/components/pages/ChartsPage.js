import React, { useContext,useState,useEffect,useRef } from 'react';
import SensorContext from '../../context/sensor/sensorContext';
import AlertContext from '../../context/alert/alertContext';
import { MDBCol,MDBCard,MDBBtn, MDBRow } from 'mdbreact';
import ReactEcharts from "echarts-for-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

// ----------------------
const ChartsPage = () => {
	//	-----------------
  const alertContext = useContext(AlertContext);
  // -----------
  const [keys, setKEYS] = useState([]);
	const [plotRHSensors,setPlotRHSensor] = useState([]);
	const [plotVELSensors,setPlotVELSensor] = useState([]);
	const [plotPWRMTRSensors,setPlotPWRMTRSensor] = useState([]);
	const [plotPRESSSensors,setPlotPRESSSensor] = useState([]);
	const [key,setKEY] = useState(null);
	const [selection,setSelection] = useState(null);
	const [period,setPeriod] = useState(0);

  const [value, onChange] = useState([new Date(), new Date()]);
		// -------------------------------------
  const sensorContext = useContext(SensorContext);
  const { sensorTypeMap, getSensors } = sensorContext;
  // --------------
	const getOptionRHA = ({title}) => {
		return ({
			title: { text: `${title}` },
			tooltip: { trigger: "axis" },
			legend: { 
				width: "83%",
				height: "17%",
				bottom: "91%",
				top: "10%",
				data: getLegendsRHData()
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: { yAxisIndex: 'none' },
					dataView: { readOnly: false },
					magicType: { type: ['line', 'bar'] },
					restore: {},
					saveAsImage: {},
				}
			},
			xAxis: {
				type: "time",
				boundaryGap: false
			},
			yAxis: {
				type: "value",
				boundaryGap: [0, '100%']
			},
			dataZoom: [
				{
					type: 'slider',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'slider',
					yAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					yAxisIndex: 0,
					filterMode: 'none'
				}
			],
			series: getSeriesRH(0)
		})
	};
	const getOptionRHB = ({title}) => {
		return ({
			title: { text: `${title}` },
			tooltip: { trigger: "axis" },
			legend: { 
				width: "83%",
				height: "17%",
				bottom: "91%",
				top: "10%",
				data: getLegendsRHData()
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: { yAxisIndex: 'none' },
					dataView: { readOnly: false },
					magicType: { type: ['line', 'bar'] },
					restore: {},
					saveAsImage: {},
				}
			},
			xAxis: {
				type: "time",
				boundaryGap: false
			},
			yAxis: {
				type: "value",
				boundaryGap: [0, '100%']
			},
			dataZoom: [
				{
					type: 'slider',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'slider',
					yAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					yAxisIndex: 0,
					filterMode: 'none'
				}
			],
			series: getSeriesRH(1)
		})
	};
	const getOptionVEL = ({title}) => {
		return ({
			title: { text: `${title}` },
			tooltip: { trigger: "axis" },
			legend: { 
				width: "83%",
				height: "17%",
				bottom: "91%",
				top: "10%",
				data: getLegends2Data()
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: { yAxisIndex: 'none' },
					dataView: { readOnly: false },
					magicType: { type: ['line', 'bar'] },
					restore: {},
					saveAsImage: {},
				}
			},
			xAxis: {
				type: "time",
				boundaryGap: false
			},
			yAxis: {
				type: "value",
				boundaryGap: [0, '100%']
			},
			dataZoom: [
				{
					type: 'slider',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'slider',
					yAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					yAxisIndex: 0,
					filterMode: 'none'
				}
			],
			series: getSeries2(0)
		})
	};
	// --------
	const getOptionPRESS = ({title}) => {
		return ({
			title: { text: `${title}` },
			tooltip: { trigger: "axis" },
			legend: { 
				width: "83%",
				height: "17%",
				bottom: "91%",
				top: "10%",
				data: getLegends2Data()
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: { yAxisIndex: 'none' },
					dataView: { readOnly: false },
					magicType: { type: ['line', 'bar'] },
					restore: {},
					saveAsImage: {},
				}
			},
			xAxis: {
				type: "time",
				boundaryGap: false
			},
			yAxis: {
				type: "value",
				boundaryGap: [0, '100%']
			},
			dataZoom: [
				{
					type: 'slider',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'slider',
					yAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					xAxisIndex: 0,
					filterMode: 'none'
				},
				{
					type: 'inside',
					yAxisIndex: 0,
					filterMode: 'none'
				}
			],
			series: getSeries2(0)
		})
	};
	// --------
	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}	
	function formatDate(date) {
		return (
			[
				date.getFullYear(),
				padTo2Digits(date.getMonth() + 1),
				padTo2Digits(date.getDate()),
			].join('-') +
			' ' +
			[
				padTo2Digits(date.getHours()),
				padTo2Digits(date.getMinutes()),
				// padTo2Digits(date.getSeconds()),
			].join(':')
		);
	}	
	const getLegendsRHData = () => {
		let _datas = [];
		plotRHSensors && plotRHSensors.forEach( _data => {
			_datas.push(_data.name)
		})
		return _datas;
	}
	const getLegends2Data = () => {
		let _datas = [];
		plotVELSensors && plotVELSensors.forEach( _data => {
			_datas.push(_data.name)
		})
		return _datas;
	}
	const getSeriesRH = (index) => {
		// ----------------------
		let _seriesdata = [];
		plotRHSensors && plotRHSensors.forEach( _sensor => {
			// ---------------------------------
			let _rslt = getSensorData(_sensor,index);
			// ---------------
			let _object = {
				name : _sensor.name,
				type : 'line',
				smooth: false,
				symbol: 'none',
				data : _rslt,
				duration: 100
			}
			_seriesdata.push(_object)
		})
		// ---------------------
		return _seriesdata;
	}
	const getSeries2 = (index) => {
		// ----------------------
		let _seriesdata = [];
		plotVELSensors && plotVELSensors.forEach( _sensor => {
			// ---------------------------------
			let _rslt = getSensorData(_sensor,index);
			// ---------------
			let _object = {
				name : _sensor.name,
				type : 'line',
				smooth: false,
				symbol: 'none',
				data : _rslt,
				duration: 100
			}
			_seriesdata.push(_object)
		})
		// ---------------------
		return _seriesdata;
	}
	// ----------------
	const getSensorData = (sensor,nIndex) => {
		// ---------------
		let dataArray = [];
		sensor.logsdata && sensor.logsdata.map( (_data,index) => {
			// -------------------------
			let _reading;
			// -------------------
			switch (sensor.type) {
				case "WTRPRS(485)":
					_reading = `0x${_data.RCV_BYTES[0]}${_data.RCV_BYTES[1]}`;
					_reading = parseFloat(_reading);
					_reading = _reading.toFixed(2)/100.0;
					_reading = Number(_reading);
					break;
				case "AIRRH(485)":
					_reading = nIndex === 0 ? Number(_data.DATAS[1])/10.0 : Number(_data.DATAS[0])/10.0;
					break;
				case "WTRTEMP(485)":
					_reading = nIndex === 0 ? Number(_data.DATAS[1])/10.0 : null;
					break;
				case "AIRFLW(485)":
					_reading = Number(_data.DATAS[0])/10.0;
					break;
				case "PWRMTR(485)":
					let _HEXStr = _data.RCV_BYTES[0] + _data.RCV_BYTES[1];
					let _HEXInt = parseInt(_HEXStr,16) * 0.01;
					_reading = Number(_HEXInt);
					break;
				case "WISENSOR":
					_reading = nIndex === 0 ? Number(_data.Temperature) :Number(_data.Humidity);
					break;
				default:
					break;
			}
			// ----------------------
			let _dateTime = formatDate(new Date(_data.TIMESTAMP));
			// console.log(_dateTime,_reading);
			if (_reading !== null && _reading  !== -999) {
				 dataArray.push([_dateTime,_reading]);
			}
			// ----------------------
		})
		// -------------
		return dataArray;
	}
	// ----------------------
	function parseFloat(str) {
		var float = 0, sign, order, mantissa, exp,
		int = 0, multi = 1;
		if (/^0x/.exec(str)) {
				int = parseInt(str, 16);
		}
		else {
				for (var i = str.length -1; i >=0; i -= 1) {
						if (str.charCodeAt(i) > 255) {
								console.log('Wrong string parameter');
								return false;
						}
						int += str.charCodeAt(i) * multi;
						multi *= 256;
				}
		}
		sign = (int >>> 31) ? -1 : 1;
		exp = (int >>> 23 & 0xff) - 127;
		mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
		for (i=0; i<mantissa.length; i+=1) {
				float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
				exp--;
		}
		return float*sign;
	}
	// --------------
	// INITIALIZATION
	// --------------
  useEffect(()=>{
    // -----------------
		if (sensorTypeMap !==null) {
			let _keys = Object.keys(sensorTypeMap);
			setKEYS(_keys);
		}
  },[sensorTypeMap])
  // ------------------
	const HandleSelection = (_key) => {
		// ---------------
		let object = sensorTypeMap[_key];
		setSelection(object.sort(compareByName));
		setKEY(_key);
		// ---------------
	}
	const SelectedSensor = (sensor) => {
		// -----------------
		let _found;
		// plotRHSensors = TEMPERATURE & HUMIDITY
		// plotVELSensors = VELOCITY
		// plotPRESSSensors = PRESSURE
		if (sensor.type === 'WTRPRS(485)') {
			_found = plotPRESSSensors.find( el => el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId)
			if (_found === undefined) {
				let _plotPRESSSensors = [ ...plotPRESSSensors ];
				_plotPRESSSensors.push(sensor);
				setPlotPRESSSensor(_plotPRESSSensors);
			} else {
				let _plotPRESSSensors = plotPRESSSensors.filter( el =>  !(el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId))
				setPlotPRESSSensor(_plotPRESSSensors);
			}
		}
		// ----------------------
		if (sensor.type === 'AIRFLW(485)') {
			_found = plotRHSensors.find( el => el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId)
			if (_found === undefined) {
				let _plotVELsensors = [ ...plotVELSensors ];
				_plotVELsensors.push(sensor);
				setPlotVELSensor(_plotVELsensors);
			} else {
				let _plotVELsensors = plotVELSensors.filter( el =>  !(el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId))
				setPlotVELSensor(_plotVELsensors);
			}
		}
		// ----------------------
		if (sensor.type === 'WISENSOR' || sensor.type==='AIRRH(485)' || sensor.type==='WTRTEMP(485)') {
			_found = plotRHSensors.find( el => el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId)
			if (_found === undefined) {
				let _plotRHsensors = [ ...plotRHSensors ];
				_plotRHsensors.push(sensor);
				setPlotRHSensor(_plotRHsensors);
			} else {
				let _plotRHsensors = plotRHSensors.filter( el =>  !(el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId))
				setPlotRHSensor(_plotRHsensors);
			}
		}
		// ---------
	}
	const checkState = (sensor) => {
		let _found1 = plotRHSensors.find( el => (el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId))
		let _found2 = plotVELSensors.find( el => (el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId))
		let _found3 = plotPRESSSensors.find( el => (el.dtuId === sensor.dtuId && el.sensorId === sensor.sensorId))
		// ----------------------
		if (_found1 === undefined && _found2 === undefined && _found3 === undefined) {
			return false;
		} else {
			return true;
		}
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
	// -------
	const loadChartData = () => {
		// ---------------
		setPeriod(period);
		let date0 = new Date(value[0]);
		let date1 = new Date(value[1]);
		// -----------------
		getSensors(-1,date0,date1);
		setPlotRHSensor([]);
		setPlotVELSensor([]);
		setSelection(null);
	}
	// ------
	// RENDER
	// ------
  return(
    <main style={{ marginTop: '2rem' }}>
			
			<MDBCol md="9" className="mb-r">
			</MDBCol>
      <div className="d-flex flex-row justify-content-center flex-wrap" >
	      <DateRangePicker onChange={onChange} value={value} />
				<MDBBtn  color={period === 0 ? 'primary' : 'default'} size="md" onClick={()=>loadChartData()}>RELOAD</MDBBtn >
				<MDBBtn  color='default' size="md" onClick={()=>setSelection(null)}>CLEAR SELECTION</MDBBtn >
			</div>
      <div className="d-flex flex-row justify-content-center flex-wrap" >
      {
        keys.length > 0 && keys.map((_key,index) => {
          return (
            <MDBCard color='primary' className='p-2 m-2 align-items-center justify-content-center' center style={{width:'150px'}} onClick={()=>HandleSelection(`${_key}`)}>
              <div className="d-flex flex-column justify-content-center" >
							<span>{_key}</span>
              </div>
            </MDBCard>
          )
        })
      }
      </div>

      <MDBRow center>

			<MDBCard className="p-2 m-2" style={{ width: "20rem" }}>

      <MDBRow center>
				{ selection && <div>SENSOR TYPE {key}</div> }
				<div className='p-2'>
				{
					selection && selection.map((_sensor,index) => {
						// ---------------------------
						let _id = `${_sensor.dtuId}-${_sensor.sensorId}`;
						let _label = _sensor.name;
						// ----------------------------
						return(
							<div class="custom-control custom-checkbox">
        				<input type="checkbox" checked={checkState(_sensor)} class="custom-control-input" id={_id} onClick={()=>SelectedSensor(_sensor)}></input>
								<label class="custom-control-label" for={_id}>{_label}</label>
							</div>
						)
					})
				}
				</div>
			</MDBRow>

			<MDBRow center>
				<div>SENSORS SELECTED</div>
				<div className='p-2'>
				{ 
					plotRHSensors && plotRHSensors.map((_sensor,index) => {
						// ---------------------------
						let _id = `P-${_sensor.dtuId}-${_sensor.sensorId}`;
						let _label = _sensor.name;
						// ----------------------------
						return(
							<div class="custom-control custom-checkbox">
        				<input type="checkbox" checked={checkState(_sensor)} class="custom-control-input" id={_id} onClick={()=>SelectedSensor(_sensor)}></input>
								<label class="custom-control-label" for={_id}>{_label}</label>
							</div>
						)
					}) 
				}
				{ 
					plotVELSensors && plotVELSensors.map((_sensor,index) => {
						// ---------------------------
						let _id = `P-${_sensor.dtuId}-${_sensor.sensorId}`;
						let _label = _sensor.name;
						// ----------------------------
						return(
							<div class="custom-control custom-checkbox">
        				<input type="checkbox" checked={checkState(_sensor)} class="custom-control-input" id={_id} onClick={()=>SelectedSensor(_sensor)}></input>
								<label class="custom-control-label" for={_id}>{_label}</label>
							</div>
						)
					}) 
				}
				</div>
			</MDBRow>

			</MDBCard>

			<MDBCard className="p-3 m-2" style={{ width: "60rem" }}>
				{ plotRHSensors.length > 0 && (
						<ReactEcharts
							option={getOptionRHA({title:'TEMPERATURE C'})}
							style={{ height: "500px", width: "100%" }}
						/>				
				)}
				{ plotRHSensors.length > 0 && (
						<ReactEcharts
							option={getOptionRHB({title:'HUMIDITY %'})}
							style={{ height: "500px", width: "100%" }}
						/>				
				)}
				{ plotVELSensors.length > 0 && (
						<ReactEcharts
							option={getOptionVEL({title:'VELOCITY'})}
							style={{ height: "500px", width: "100%" }}
						/>				
				)}
				{ plotPRESSSensors.length > 0 && (
						<ReactEcharts
							option={getOptionPRESS({title:'PRESSURE'})}
							style={{ height: "500px", width: "100%" }}
						/>				
				)}
			</MDBCard>

			</MDBRow>

		</main>
  )
}

// ----------------------
export default ChartsPage