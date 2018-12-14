import React, { Component } from 'react';
import auth from '../lib/auth-service';
import { withAuth } from '../providers/AuthProvider';
class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user);
    })
    .catch( error => {
      this.setState({
        error: error.response.data.error
      })
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
  const { username, password, error } = this.state;
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.handleFormSubmit}>
          < div>
            <label className="label">Username</label>
            <input className="input" type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <input className="button" type="submit" value="Login" />
        </form>
        <p>{error}</p>
      </div>
    )
  }
}

export default withAuth(Login);