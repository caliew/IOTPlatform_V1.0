import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminPage from './components/pages/AdminPage';
import BigDATAView from './components/pages/BIgDATAView'
import MaintScehduler from './components/pages/MaintScehduler';
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage';
import ReportPage from './components/pages/ReportPage';
import AboutPage from './components/pages/AboutPage';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/BigDATAView' component={BigDATAView} />
        <Route exact path='/cmms' component={MaintScehduler} />
        <Route exact path='/admin' component={AdminPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/report' component={ReportPage} />
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;