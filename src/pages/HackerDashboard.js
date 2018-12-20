import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class HackerDashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="title is-3">Hacker dashboard</h1>
        <aside className="menu">
          <p className="menu-label menuu">
            Websites
          </p>
          <ul className="menu-list">
          <Link to='/websites'>Open a report</Link>
          </ul>
          <p className="menu-label menuu">
            Reports
          </p>
          <ul className="menu-list">
          <Link to='/my-reports-open'>My open reports</Link>
          <Link to='/my-reports-closed'>My closed reports</Link>
          <Link to='/my-reports-rejected'>My rejected reports</Link>
          </ul>
          <p className="menu-label menuu">
            Chat
          </p>
          <ul className="menu-list">
          <Link to='/chats'>Open chats</Link>
          </ul>
        </aside>
      </div>
    )
    }
}

export default withAuth(HackerDashboard);
