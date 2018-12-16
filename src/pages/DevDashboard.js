import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class DevDashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="title is-2">Dashboard</h1>
        <Link to='/open-reports'>Open reports</Link>
        <Link to='/closed-reports'>Closed reports</Link>
        <Link to='/rejected-reports'>Rejected reports</Link>
        <Link to='/add-website'>Add a Website</Link>
        <Link to='/hackers'>Start chat with a hacker</Link>
        <Link to='/'>Chats</Link>
        <Link to='/'>Leaderboards</Link>
      </div>
    )
  }
}

export default withAuth(DevDashboard);
