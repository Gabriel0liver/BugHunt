import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Home extends Component {

  render() {
    return (
        <div>
          <h1>Bug Hunt</h1>
      </div>
    );
  }
}

export default withAuth(Home);