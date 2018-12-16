import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import report from '../lib/report-service'

class MyWebsites extends Component {
  render() {
    return (
      <div>
        <h1>My websties</h1>
      </div>
    )
  }
}

export default withAuth(MyWebsites);