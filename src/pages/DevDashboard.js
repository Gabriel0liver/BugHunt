import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class DevDashboard extends Component {
  render() {
    
    return (
      <div>
        <h1>Welcome {this.props.user.type}</h1>
        <Link to='/open-reports'>Open reports</Link>
      </div>
    )
  }
}

export default withAuth(DevDashboard);
