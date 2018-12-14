import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  renderIsLoggedIn = () => {
    return <div>
      <ul>
        <li onClick={this.props.logout}>Logout</li>
        { this.props.user.type === 'hacker' ? (
             this.props.location.pathname === '/dashboard-hacker' ? (
              <div>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Account</Link></li>
              </div>
            ) : (
              <li><Link to='/dashboard-hacker'>Dashboard</Link></li>
            ) 
          ) : (
            this.props.location.pathname === '/dashboard-dev' ? (
              <div>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Account</Link></li>
              </div>
            ) : (
              <li><Link to='/dashboard-dev'>Dashboard</Link></li>
            )
          ) }
        
      </ul>
    </div>
  }

  renderIsNotLoggedIn = () => {
    return <div>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup-hacker'>Signup as a hacker</Link></li>
        <li><Link to='/signup-dev'>Signup as a as developer</Link></li>
      </ul>
    </div>
  }

  render() {
    return (
      <div>
        { this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn() }
      </div>
    )
  }
}

export default withRouter(withAuth(Navbar));