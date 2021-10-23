import React, { useState,useEffect,useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import NotificationContext from '../../context/notification/notificationContext';
import SensorContext from '../../context/sensor/sensorContext';
import { MDBContainer,MDBListGroup,MDBListGroupItem,MDBBadge,MDBJumbotron } from 'mdbreact';

const demoNotifications = [
	{ dateTime: "2021-08-25T14:04", message:"BACKEND#1 RH SENSOR > 21C", badge: "primary" },
	{ dateTime: "2021-08-25T09:05", message:"HVAC CHILLER EFFICIENCY DROP > 75%", badge: "secondary"},
	{ dateTime: "2021-08-24T23:52", message:"COMPRESSORE C1 PRESSURE > 85%", badge: "danger"},
	{ dateTime: "2021-08-24T22:52", message:"AIRFLOW < LIMIT SET", badge: "warning"},
	{ dateTime: "2021-08-24T22:52", message:"[COLOR:INFO...] ", badge: "info"},
	{ dateTime: "2021-08-24T22:52", message:"[COLOR:LIGHT...] ", badge: "light"},
	{ dateTime: "2021-08-24T22:52", message:"[COLOR:DARK...] ", badge: "dark"},
]

const Notification = () => {
	// ---------------------------
  const notificationContext = useContext(NotificationContext);	
  const { notifications } = notificationContext;
  const authContext = useContext(AuthContext);
  const { getAllUsers, user, users, companies, updateUser, updateCompany, clearErrors, isAuthenticated } = authContext;
	const [userNotifications,setNotifications] = useState(null)
	const [userNotificationsMap,setNotificationsMap] = useState(null)
	const [userSensors,setUserSensors] = useState([]);
	// ---------------------------------------------
	const sensorContext = useContext(SensorContext);
  const { sensors, sensorsData, getSensors, getSensorsData } = sensorContext;
	// --------------
	useEffect(() => {
		// ----------
		let sensorsArr = [];
		if (sensors) {
			sensors.map(sensor => {
				let key = `${sensor.dtuId}:${sensor.sensorId}`;
				sensorsArr.push(key)
			})
			setUserSensors(sensorsArr);
		}
		// -----------------
		let userNotificationArr = [];
		if (notifications) {
			notifications.map( notice => {
				let key = `${notice.dtuId}:${notice.sensorId}`;
				if(sensorsArr.includes(key)) {
					userNotificationArr.push(notice);
				}
			})
			// -------------
			let noticeMap = userNotificationArr.reduce((map,notice)=>{
				let key = `${notice.dtuId}:${notice.sensorId}`;
				if (map[key] == null) {
					map[key] = [];
					map[key].push(notice);
				} else {
					map[key].push(notice);
				}
				return map
			},{});
			// -------------------
			userNotificationArr = [];
			Object.entries(noticeMap).forEach(([key, value]) => {
				let alert = value[value.length-1];
				alert['Flag'] = value.length;
				userNotificationArr.push(alert);
			});
			setNotifications(userNotificationArr);
			setNotificationsMap(noticeMap);
		}
	},[notifications,sensors])
	// ---------------------------
	const getTimeDateLabel = (date) => {
		let _date = new Date(date);
		let mm = _date.getMonth()+1;
		let dd = _date.getDate();
		let hours = ("0" + _date.getHours()).slice(-2);
		let minutes = ("0" + _date.getMinutes()).slice(-2);
		return `${dd}/${mm} ${hours}:${minutes}`
	}
	// -----
	// userNotifications && Object.entries(userNotifications).forEach(([key, value]) => {
	// let arrNotice = value[0]
	// console.log(arrNotice)
	// });
	const getAlertText = (name,sensorId,reading,limit) => {
		let strAlert = '';
		if (reading > limit) strAlert = ` ${name} [${sensorId}] ... ${reading}C > ${limit}C` 
		if (reading < limit) strAlert = ` ${name} [${sensorId}] ... ${reading}C < ${limit}C` 
		return strAlert;
	}
	// --------
	return (
		<MDBContainer style={{width: "auto",position: "relative",marginTop: '2rem'}} >
			<MDBJumbotron className="p-4">

	      <h3>NOTIFICATION MANAGEMENT</h3>

				<MDBListGroup className="my-1 mx-1" >
					{
						userNotifications && userNotifications.map((note) => {
							let color = note.type;
							return (
								<h6 className="my-0">
									<MDBListGroupItem color={color}>{getTimeDateLabel(note.date)}<span>&nbsp;&nbsp;&nbsp;</span>
										<MDBBadge color={color}>{color.toUpperCase()}</MDBBadge> &nbsp;&nbsp;
										<i class="far fa-bell" />{note.Flag} &nbsp;&nbsp;
										{getAlertText(note.name,note.sensorId,note.reading,note.limit)}
									</MDBListGroupItem>
								</h6>
							)
						})
					}
				</MDBListGroup>
			</MDBJumbotron>
		</MDBContainer>
	)
}

export default Notification
