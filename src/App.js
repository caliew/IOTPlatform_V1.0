import React from 'react';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alerts'

import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import SensorState from './context/sensor/sensorState';
import NotificationState from './context/notification/notificationState'

const App = () => {
  // --------------------------
  return (
    <AuthState>
      <SensorState>
      <AlertState>
        <NotificationState>
        <Router>
          <Alert />
          <Navbar />
        </Router>
        </NotificationState>
      </AlertState>
      </SensorState>
    </AuthState>    
  );
}

export default App;
