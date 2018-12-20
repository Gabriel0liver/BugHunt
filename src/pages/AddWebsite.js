import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import website from '../lib/website-service';
import { withAuth } from '../providers/AuthProvider';

class AddWebsite extends Component {

	state = {
		title: "",
		url: "",
		redirect: false,
		error: null
	}
	

	handleSubmit = (event) => {
		event.preventDefault();
    const title = this.state.title;
		const url = this.state.url;

		website.create({ title, url })
      .then( () => {
					this.setState({
						redirect: true
					})
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
		const { title, url, redirect, error } = this.state;
		if (redirect) {
			return (<Redirect to="/dashboard-dev" />)
		} 
    return (
      <div>
        <h1>Add a website</h1>
        <form onSubmit={this.handleSubmit}>
        <div>
        	<label className="label">Title</label>
        	<input autoComplete="off" className="input" type="text" name="title" value={title} onChange={this.handleChange}/>
        </div>
        <div>
					<label className="label">Url</label>
        	<input autoComplete="off" className="input" type="text" name="url" value={url} onChange={this.handleChange}/>
        </div>
        <input className="button" type="submit" value="Submit" />

				<p className="alert">{error}</p>

        </form>
				
      </div>
    )
  }
}

export default withAuth(AddWebsite);