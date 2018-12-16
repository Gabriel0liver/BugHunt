import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'

import Navbar from './components/Navbar';
import HackerDashboard from './pages/HackerDashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import SignupHacker from './pages/SignupHacker';
import SignupDev from './pages/SignupDev';
import HackerRoute from './components/HackerRoute';
import DevRoute from './components/DevRoute';
import DevDashboard from './pages/DevDashboard';
import HackerReports from './pages/HackerReports';
import CreateReport from './pages/CreateReport';
import DevReports from './pages/DevReports';
import Report from './pages/ViewReport';
import MyWebsites from './pages/MyWebsites';
import Website from './pages/Website';
import AllWebsites from './pages/AllWebsites';
import AddWebsite from './pages/AddWebsite';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar></Navbar>
          <Switch>
              <Route exact path="/" component={Home} />
              <AnonRoute  path="/signup-hacker" component={SignupHacker} />
              <AnonRoute  path="/signup-dev" component={SignupDev} />
              <AnonRoute path="/login" component={Login} />
              <HackerRoute path="/dashboard-hacker" component={HackerDashboard} />
              <HackerRoute path="/my-reports" component={HackerReports} />
              <HackerRoute path="/new-report/:websiteId" component={CreateReport} />
              <HackerRoute path="/websites" component={AllWebsites} />
              <DevRoute path="/dashboard-dev" component={DevDashboard} />
              <DevRoute path="/open-reports" component={DevReports} />
              <DevRoute path="/my-websites" component={MyWebsites} />
              <DevRoute path="/add-website" component={AddWebsite} />
              <PrivateRoute path="/report/:id" component={Report} />
              <PrivateRoute path="/website/:id" component={Website} />
              <Route path="" component={NotFound}/>
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
