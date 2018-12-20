import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class DevDashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="title is-3">Dev dashboard</h1>
        <aside className="menu">
          <p className="menu-label">
            Reports
          </p>
          <ul className="menu-list">
          <Link to='/open-reports'>Open reports</Link>
          <Link to='/closed-reports'>Closed reports</Link>
          <Link to='/rejected-reports'>Rejected reports</Link>
          </ul>
          <p className="menu-label">
            Websites
          </p>
          <ul className="menu-list">
          <Link to='/websites'>My websites</Link>
          <Link to='/add-website'>Add a website</Link>
          </ul>
          <p className="menu-label">
            Chat
          </p>
          <ul className="menu-list">
          <Link to='/chats'>Open chats</Link>
          <Link to='/hackers'>Start chat with a hacker</Link>
          </ul>
        </aside>
      </div>
    )
  }
}

export default withAuth(DevDashboard);
