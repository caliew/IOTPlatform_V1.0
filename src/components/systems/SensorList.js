import React, { Fragment } from 'react';
import { MDBIcon } from 'mdbreact';

const getTableRow = (index,sensor) => {
	const { name,logsdata,sensorId } = sensor
	let reading,limits;
	const _date = new Date(logsdata[0].TIMESTAMP);
	let mm = _date.getMonth()+1;
	let dd = _date.getDate();
	let batt = logsdata[0].BATT ? logsdata[0].BATT : null;
	let interval = logsdata[0].INTERVAL ? logsdata[0].INTERVAL : null;
	let hours = ("0" + _date.getHours()).slice(-2);
	let minutes = ("0" + _date.getMinutes()).slice(-2);
	let _timediff = new Date().getTime()  - _date.getTime() ;
	_timediff = _timediff/ (1000 * 60 * 60);
	// ------------------
	switch (sensor.type)
	{
		case 'AIRRH(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[1]/10.0.toFixed(1) + '°C': '°C';
			limits = '';
			break;
		case 'AIRFLW(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[0]/10.0.toFixed(2) + 'm/s': 'm/s';
			limits = '';
			break;
		case 'WTRPRS(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[2] + 'psi': 'psi';
			limits = '';
			break;
		case 'WTRTEMP(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[1]/10.0.toFixed(1) + '°C': '°C';
			limits = `${sensor.limits.TEMPERATURE_MIN}°C/${sensor.limits.TEMPERATURE_MAX}°C`			
			break;
		case 'WTRRH(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[1]/10.0.toFixed(1) + '°C': '°C';
			limits = `${sensor.limits.TEMPERATURE_MIN}°C/${sensor.limits.TEMPERATURE_MAX}°C`			
			break;
		case 'PWRMTR(485)':
			reading = logsdata.length > 0 ? logsdata[0].DATAS[0]/10.0.toFixed(1) : null;
			limits = '';
			break;
		case 'WISENSOR':
			reading = logsdata.length > 0 ? `${logsdata[0].Temperature.toFixed(1)}°C`: '°C';
			limits = `${sensor.limits.TEMPERATURE_MIN}°C/${sensor.limits.TEMPERATURE_MAX}°C`			
			break;
		default:
			reading = null
			break;
	}
	return (
		<tr>
			<td>{index}</td><td>{name}<br/>SENSOR ID:{sensorId}</td>
			<td>{`${dd}/${mm}`}<br/>{`${hours}:${minutes}`}</td>
			<td>
				{reading}<br/>
				{limits}<br/>
				<MDBIcon icon="battery-full" size="2x"/>&nbsp;&nbsp;
				<MDBIcon icon={_timediff > 6 ? "unlink" : "link"} className={_timediff > 6 ? "red-text" : "green-text"} size="2x"/>
			</td>

		</tr>
	)
}
const SensorList = ({sensor,index}) => {
	return (
		<>
			{ sensor.type === 'AIRRH(485)' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
			{ sensor.type === 'AIRFLW(485)' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
			{ sensor.type === 'WTRPRS(485)' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
			{ sensor.type === 'WTRTEMP(485)' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
			{ sensor.type === 'WTRRH(485)' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
			{ sensor.type === 'PWRMTR(485)' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
			{ sensor.type === 'WISENSOR' && sensor.logsdata.length > 0 && getTableRow(index+1,sensor) }
		</>
	)
}

export default SensorList;