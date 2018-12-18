import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  renderIsLoggedIn = () => {
    return <nav className="navbar is-light" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
        
        { this.props.user.type === 'hacker' ? (
             this.props.location.pathname === '/dashboard-hacker' ? (
              <Link className="navbar-item" to='/'>Home</Link>
            ) : (
              <Link className="navbar-item" to='/dashboard-hacker'>Dashboard</Link>
            ) 
          ) : (
            this.props.location.pathname === '/dashboard-dev' ? (
              <Link className="navbar-item" to='/'>Home</Link>
            ) : (
              <Link className="navbar-item" to='/dashboard-dev'>Dashboard</Link>
            )
          ) }
        <div className="navbar-item" onClick={this.props.logout}>Logout</div>
    </div>
    </nav>
  }

  renderIsNotLoggedIn = () => {
    return <nav className="navbar is-light" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to='/login'>Login</Link>
      <div className="end-navbar">
          <Link className="navbar-item navvv" to='/signup-hacker'>Signup as a hacker</Link>
          <Link className="navbar-item navvv" to='/signup-dev'>Signup as a dev</Link>
      </div>
    </div>
    </nav>
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