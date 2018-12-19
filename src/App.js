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
import HackerReportsOpen from './pages/HackerReportsOpen';
import HackerReportsClosed from './pages/HackerReportsClosed';
import HackerReportsRejected from './pages/HackerReportsRejected';
import CreateReport from './pages/CreateReport';
import DevReportsOpen from './pages/DevReportsOpen';
import DevReportsClosed from './pages/DevReportsClosed';
import DevReportsRejected from './pages/DevReportsRejected';
import Report from './pages/ViewReport';
import Website from './pages/Website';
import Websites from './pages/Websites';
import AddWebsite from './pages/AddWebsite';
import HackerList from './pages/HackerList';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';

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
              <HackerRoute path="/my-reports-open" component={HackerReportsOpen} />
              <HackerRoute path="/my-reports-closed" component={HackerReportsClosed} />
              <HackerRoute path="/my-reports-rejected" component={HackerReportsRejected} />
              <HackerRoute path="/new-report/:websiteId" component={CreateReport} />
              <DevRoute path="/dashboard-dev" component={DevDashboard} />
              <DevRoute path="/open-reports" component={DevReportsOpen} />
              <DevRoute path="/closed-reports" component={DevReportsClosed} />
              <DevRoute path="/rejected-reports" component={DevReportsRejected} />
              <DevRoute path="/add-website" component={AddWebsite} />
              <DevRoute path="/hackers" component={HackerList} />
              <PrivateRoute path="/websites" component={Websites} />
              <PrivateRoute exact path="/chats" component={ChatList}/>
              <PrivateRoute path="/chats/:id" component={Chat}/>
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
