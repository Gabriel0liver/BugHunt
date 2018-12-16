import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    error: null
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    auth.signup({ username, password }, 'dev')
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
        this.props.setUser(user)
      })
      .catch( error => {
        this.setState({
          error: error.response.data.error
        })
      } )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, error} = this.state;
    return (
      <div>
        <h2>Sign up as a dev</h2>
        <form onSubmit={this.handleFormSubmit} className="signup">
        < div>
            <label className="label">Username</label>
            <input className="input" type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <input className="button" type="submit" value="Signup" />

          <p>Already have account? 
          <Link to={"/login"}> Login</Link>
          </p>

          <p className="alert">{error}</p>

        </form>        
      </div>
    )
  }
}

export default withAuth(Signup);