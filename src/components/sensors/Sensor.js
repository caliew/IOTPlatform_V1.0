import React, { Fragment, useContext, useEffect } from 'react';
import SensorItem from './SensorItem';
import Spinner from '../layout/Spinner';
import { MDBContainer,MDBRow,MDBCardGroup, MDBPagination , 
         MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import SensorContext from '../../context/sensor/sensorContext';

const Sensors = ({SelectSensor}) => {
	// ---------------------
	// ACCESS SENSOR CONTEXT
	// ---------------------
	const sensorContext = useContext(SensorContext);
	const { sensors, filtered, getSensors, loading, } = sensorContext;
	// ---------------
	useEffect( ()=> {
			getSensors();
			// eslint-disable-next-line
	},[])
	// ---------
	const getLocationSensorsMap = () => {
		// ---------------------------------
		// CONSTRUCTION LOCATION SENSORS MAP
		// ---------------------------------
		if (sensors) {
			const locationSensorsMap = sensors.reduce((map,sensor) => {
			if (map[sensor.location] === undefined) {
					map[sensor.location] = [];
					map[sensor.location].push(sensor);
			} else {
					map[sensor.location].push(sensor);
			};
			return map;
			},{})
			return locationSensorsMap;
		} else 
		{
				return null;
		}
	}
	return (
		<MDBRow className="masonry-with-columns">
			<MDBCardGroup deck className="justify-content-center">
				{sensors !== null && !loading ? (
					filtered !== null ? filtered.map(sensor => (<SensorItem sensor={sensor} SelectSensor={SelectSensor}/>))
								: sensors.map(sensor => (<SensorItem sensor={sensor} SelectSensor={SelectSensor}/>))
				) : (
					<Spinner />
				)}
			</MDBCardGroup>
		</MDBRow >
	)
}

export default Sensors
