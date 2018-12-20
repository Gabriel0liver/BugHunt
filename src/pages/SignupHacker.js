import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../lib/auth-service';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    email: "",
    username: "",
    password1: "",
    password2: "",
    error: null
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password1;
    const email = this.state.email;

    if(this.state.password1 !== this.state.password2){
      return this.setState({
        password1: "",
        password2: "",
        error: "Passwords don't match"
      })
    }

    auth.signup({ username, password, email },'hacker')
      .then( (user) => {
        this.setState({
            username: "",
            password1: "",
            password2: "",
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
    const { email, username, password1, password2, error} = this.state;
    return (
      <div>
          <h2>Sign up as a hacker</h2>
        <form onSubmit={this.handleFormSubmit}>
        < div>
            <label className="label">Email</label>
            <input autoComplete="off" className="input" type="email" name="email" value={email} onChange={this.handleChange}/>
          </div>
        < div>
            <label className="label">Username</label>
            <input autoComplete="off" className="input" type="text" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" name="password1" value={password1} onChange={this.handleChange} />
          </div>
          <div>
            <label className="label">Confirm password</label>
            <input className="input" type="password" name="password2" value={password2} onChange={this.handleChange} />
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