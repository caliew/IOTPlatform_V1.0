import {
  SET_SENSORS,
  SET_RAWSENSORS,
  SENSOR_ERROR,
  ADD_SENSOR,
  UPDATE_SENSOR,
  UPDATE_SENSORSTATS,
  DELETE_SENSOR,
  SET_CURRENT_SENSOR,
  CLEAR_CURRENT_SENSOR,
  FILTER_SENSORS,
  CLEAR_FILTER_SENSORS,
  CLEAR_SENSORS,
  GET_SENSORS_DATA
} from '../types';

/*
function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}
*/
// -----------
function getReading(sensor) {
	const { logsdata } = sensor
	let reading;
	// ------------------
	switch (sensor.type)
	{
		case 'AIRRH(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[1]/10.0.toFixed(1) + '°C': '°C';
			break;
		case 'AIRFLW(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[0]/10.0.toFixed(2) + 'm/s': 'm/s';
			break;
		case 'WTRPRS(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[2] + 'psi': 'psi';
			break;
		case 'WTRTEMP(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[1]/10.0.toFixed(1) + '°C': '°C';
			break;
		case 'WTRRH(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[1]/10.0.toFixed(1) + '°C': '°C';
			break;
		case 'PWRMTR(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[0]/10.0.toFixed(1) : null;
			break;
		case 'WISENSOR':
			reading = logsdata.length > 0 ? `${logsdata[0].Temperature.toFixed(1)}°C`: '°C';
			break;
		default:
			reading = null
			break;
	}  
  return reading;
}
function findSensor(sensors,dtuId,sensorId) {
  let sensor = sensors.find(sensor => (sensor.dtuId == dtuId && sensor.sensorId == sensorId));
  return sensor ? getReading(sensor) : '-';
}
// --------------
function createData(sensors) {
  // --------
  if (!sensors) {
    return null;
  }
  //  ----------
  return {
    CTW_A_TEMP1 : findSensor(sensors,201,4),
    CTW_A_TEMP2 : findSensor(sensors,201,36),
    CTW_A_FLOWRATE : findSensor(sensors,0,0),
    CTW_A_ELECTPWR : findSensor(sensors,0,0),

    CTW_B_TEMP1 : findSensor(sensors,204,38),
    CTW_B_TEMP2 : findSensor(sensors,204,10),
    CTW_B_FLOWRATE : findSensor(sensors,0,0),
    CTW_B_ELECTPWR : findSensor(sensors,0,0),
    
    WCPU_A_TEMP1 : findSensor(sensors,214,32),
    WCPU_A_TEMP2 : findSensor(sensors,214,34),
    WCPU_A_FLOWRATE : findSensor(sensors,0,0),
    WCPU_A_ELECTPWR : findSensor(sensors,0,0),
    
    WCPU_B_TEMP1 : findSensor(sensors,215,22),
    WCPU_B_TEMP2 : findSensor(sensors,215,30),
    WCPU_B_FLOWRATE : findSensor(sensors,0,0),
    WCPU_B_ELECTPWR : findSensor(sensors,0,0),

    AHU_A_TEMP1 : findSensor(sensors,202,6),
    AHU_A_TEMP2 : findSensor(sensors,202,14),
    AHU_A_FLOWRATE : findSensor(sensors,0,0),
    AHU_A_ELECTPWR : findSensor(sensors,0,0),
    
    AHU_B_TEMP1 : findSensor(sensors,209,20),
    AHU_B_TEMP2 : findSensor(sensors,209,26),
    AHU_B_FLOWRATE : findSensor(sensors,0,0),
    AHU_B_ELECTPWR : findSensor(sensors,0,0),
    
    CHILLER_A_CH_TEMP1 : findSensor(sensors,207,24),
    CHILLER_A_CH_TEMP2 : findSensor(sensors,207,16),
    CHILLER_A_CH_FLOWRATE : findSensor(sensors,0,0),
    CHILLER_A_CW_TEMP1 : findSensor(sensors,207,12),
    CHILLER_A_CW_TEMP2 : findSensor(sensors,207,18),
    CHILLER_A_CW_FLOWRATE : findSensor(sensors,0,0),
    
    CHILLER_B_CH_TEMP1 : findSensor(sensors,200,2),
    CHILLER_B_CH_TEMP2 : findSensor(sensors,0,28),
    CHILLER_B_CH_FLOWRATE : findSensor(sensors,0,0),
    CHILLER_B_CW_TEMP1 : findSensor(sensors,0,40),
    CHILLER_B_CW_TEMP2 : findSensor(sensors,205,8),
    CHILLER_B_CW_FLOWRATE : findSensor(sensors,0,0),

    CHILLER_A_ELECTPWR : findSensor(sensors,0,0),
    CHILLER_B_ELECTPWR : findSensor(sensors,0,0),
    

  };
  // -------
}

export default (state, action) => {
  switch (action.type) {
    case SET_SENSORS:
      return {
        ...state,
        sensors: action.payload,
        locationSensorsMap : action.payload.reduce((map,sensor) => { 
            if (map[sensor.location] === undefined) {
            map[sensor.location] = [];
            map[sensor.location].push(sensor);
          } else {
            map[sensor.location].push(sensor); };
          return map; },{}),
        loading: false
      };
    case SET_RAWSENSORS:
      return {
        ...state,
        rawsensors:action.payload,
        loading: false
      };
    case ADD_SENSOR:
      console.log(`... REDUCER ADD SENSOR...`)
      console.log(action.payload)
      return {
        ...state,
        sensors: [action.payload, ...state.sensors],
        loading: false
      };
    case UPDATE_SENSOR:
      console.log(`... REDUCER UPDATE SENSOR...`)
      return {
        ...state,
        sensors: state.sensors.map(sensor =>
          sensor._id === action.payload._id ? action.payload : sensor
        ),
        loading: false
      };
    case UPDATE_SENSORSTATS:
      return {
        ...state,
        sensorStatsData: action.payload,
        loading:false
      };
    case DELETE_SENSOR:
      console.log(`... REDUCER DELETE SENSOR...`)
      return {
        ...state,
        sensors: state.sensors.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_SENSORS:
      console.log(`... REDUCER CLEAR SENSORS...`)
      return {
        ...state,
        sensors: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT_SENSOR:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT_SENSOR:
      return {
        ...state,
        current: null
      };
    case FILTER_SENSORS:
      const regex = new RegExp(`${action.payload}`, 'gi');
      return {
        ...state,
        filtered: state.sensors.filter(sensor => {
          return sensor.name.match(regex) || sensor.type.match(regex) || sensor.dtuId.match(regex) || sensor.sensorId.match(regex) || sensor.location.match(regex);
        })
      };
    case CLEAR_FILTER_SENSORS:
      console.log(`... REDUCER CLEAR FILTERED SENSOR...`)
      return {
        ...state,
        filtered: null
      };
    case GET_SENSORS_DATA :
      return {
        ...state,
        sensorsData : createData(state.sensors)
      };
    case SENSOR_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
