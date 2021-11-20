import React, { useContext,useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
import NotificationBoard from '../notification/NotificationBoard';
import { MDBContainer,MDBIcon,MDBCardGroup,MDBCard,MDBCardBody,MDBCardTitle,MDBCardFooter } from 'mdbreact';
	
import AuthContext from '../../context/auth/authContext';
import SensorContext from '../../context/sensor/sensorContext';
import NotificationContext from '../../context/notification/notificationContext';

import AHUAirflowSysModule from '../systems/AHUAirflowSysModule';
import AHUAirTempSysModule from '../systems/AHUAirTempSysModule';
import ENVSysModule from '../systems/ENVSysModule';
import AIRCompSysModule from '../systems/AIRCompSysModule';
import TDK_HVAC_PlanView from '../systems/svg/TDK_HVAC_PlanView';

const Home = () => {
	// --------------------------
  const history = useHistory();
	// --------------------------
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, addTimer, getAllCompanies } = authContext;
	// ------------------------
	const notificationContext = useContext(NotificationContext);
	const { getNotification } = notificationContext;
	// ---------------------------------------------
	const sensorContext = useContext(SensorContext);
  const { filterSensors, sensorsData, getSensors } = sensorContext;
	// ---------------------
	const [selection,setSelection] = useState(null);
  const [systemComponent, setSystemComponent] = useState(null);
  const [dataHeatMap,setHeatMap] = useState([]);
	const [mTimer,setTimer] = useState(null);
	// -------------
	let nCounter = 0;
	useEffect(()=> {
		!isAuthenticated && history.push('/login');
		if (isAuthenticated)  {
			// ----------
			getSensors();
			getNotification();
    	// getSensorsData();
			getAllCompanies();
			// ----------------
			if (mTimer === null) {
				const _mTimer = setInterval(handleTimer, 1000*60*1);
				addTimer(_mTimer);
			}
		}
	},[user])
  // --------------------------------------------
	const handleTimer = () => {
		// getSensors();
		// console.log('...TIMER CALLED... HANDLER TIMER...');
		// console.log('...GET SENSORS ...',new Date());
		getSensors();
    // getSensorsData();
		getNotification();
		// getAlerts();
	}
  const handleComponetSelection = (sysName) => {
		// --------------------------
    setSystemComponent(sysName);
    filterSensors(sysName);
		// --------------------
  }
	// -----
	return (
    <main size="sm" style={{ marginTop: '2rem' }}>
			<NotificationBoard />
			<MDBContainer className="my-4">
					<MDBCardGroup >

						<MDBCard onClick={()=>setSelection('ENV_RH')} className={selection==='ENV_RH' && 'grey lighten-2'}>
							<MDBIcon icon="temperature-high" size="3x" className="d-flex pt-4 justify-content-center" />
							{/* <MDBCardImage src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="MDBCard image cap" top hover overlay="white-strong" />								 */}
							<MDBCardBody>
								<MDBCardTitle tag="h5">ENVIRONMENTAL VARIABLES</MDBCardTitle>
							</MDBCardBody>
							<MDBCardFooter small muted>
								Last updated 3 mins ago
							</MDBCardFooter>
						</MDBCard>

						{ user && (user.companyname != "AWC" && user.companyname != "IKN") && (
								<MDBCard onClick={()=>setSelection('AHU_AFLW')} className={selection==='AHU_AFLW' && 'grey lighten-2'}>
									<MDBIcon fas icon="wind" size='3x' className="d-flex pt-4 justify-content-center"/>
									{/* <MDBCardImage src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="MDBCard image cap" top hover overlay="white-strong" />								 */}
									<MDBCardBody>
										<MDBCardTitle tag="h5">AHU DUCT AIRFLOW</MDBCardTitle>
									</MDBCardBody>
									<MDBCardFooter small muted>
										Last updated 3 mins ago
									</MDBCardFooter>
								</MDBCard>
						)}
						{ user && (user.companyname != "AWC" && user.companyname != "IKN") && (
								<MDBCard onClick={()=>setSelection('AHU_ATMP')} className={selection==='AHU_ATMP' && 'grey lighten-2'}>
									<MDBIcon icon='thermometer-half' size="3x" className="d-flex pt-4 justify-content-center" />
									{/* <MDBCardImage src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="MDBCard image cap" top hover overlay="white-strong" />								 */}
									<MDBCardBody>
										<MDBCardTitle tag="h5">AHU DUCT TEMPERATURE</MDBCardTitle>
									</MDBCardBody>
									<MDBCardFooter small muted>
										Last updated 3 mins ago
									</MDBCardFooter>
								</MDBCard>
						)}
						{ user && (user.companyname != "AWC" && user.companyname != "IKN") && (
							<MDBCard onClick={()=>setSelection('SYS_COMPR')} className={selection==='SYS_COMPR' && 'grey lighten-2'}>
								{/* <MDBIcon fas icon="wind" size='2x' className="d-flex pt-4 justify-content-center"/> */}
								<MDBIcon fas icon="tachometer-alt" size="3x" className="d-flex pt-4 justify-content-center" />
								{/* <MDBCardImage src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="MDBCard image cap" top hover overlay="white-strong" />								 */}
								<MDBCardBody>
									<MDBCardTitle tag="h5">AIR COMPRESSOR</MDBCardTitle>
								</MDBCardBody>
								<MDBCardFooter small muted>
									Last updated 3 mins ago
								</MDBCardFooter>
							</MDBCard>
						)}
						{ user && (user.companyname != "AWC" && user.companyname != "IKN") && (
							<MDBCard onClick={()=>setSelection('SYS_HVAC')} className={selection==='SYS_HVAC' && 'grey lighten-2'}>
								<MDBIcon far icon="snowflake" size="3x" className="d-flex pt-4 justify-content-center" />
								{/* <MDBCardImage src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="MDBCard image cap" top hover overlay="white-strong" />								 */}
								<MDBCardBody>
									<MDBCardTitle tag="h5">HVAC SYSTEM</MDBCardTitle>
								</MDBCardBody>
								<MDBCardFooter small muted>
									Last updated 3 mins ago
								</MDBCardFooter>
							</MDBCard>
						)}
					</MDBCardGroup>
			</MDBContainer>
			{
				selection && user && user.companyname && (
				<MDBContainer>
					{ selection === 'AHU_AFLW' && <AHUAirflowSysModule /> }
					{ selection === 'AHU_ATMP' && <AHUAirTempSysModule /> }
					{ selection === 'ENV_RH' && <ENVSysModule type='1' userCompanyName={user.companyname}/> }
					{ selection === 'SYS_COMPR' && <AIRCompSysModule /> }
					{ selection === 'SYS_HVAC' && 
							<TDK_HVAC_PlanView model='4' color='black' 
								sensorsData={sensorsData} 
								handleComponetSelection={handleComponetSelection} 
								systemComponent={systemComponent} /> }
				</MDBContainer>)
			}
    </main>
	)
}

export default Home