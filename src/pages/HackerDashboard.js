import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class HackerDashboard extends Component {
  render() {
    
    return (
      <div>
        <h1>Welcome {this.props.user.type}</h1>
        <Link to='/my-reports'>My reports</Link>
        <Link to='/new-report'>Open a new report</Link>
      </div>
    )
  }
}

export default withAuth(HackerDashboard);
