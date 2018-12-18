import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import report from '../lib/report-service';
import { withAuth } from '../providers/AuthProvider';

class CreateReport extends Component {

	state = {
		title: "",
		description: "",
		redirect: false,
		error: null
	}
	

	handleSubmit = (event) => {
		event.preventDefault();
    const title = this.state.title;
		const website = this.props.match.params.websiteId;
		const description = this.state.description;

		report.create({ title, website, description })
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
		const { title, dev, description, redirect, error } = this.state;
		if (redirect) {
			return (<Redirect to="/dashboard-hacker" />)
		} 
    return (
      <div>
        <h1>Open a new report for "website name"</h1>
        <form onSubmit={this.handleSubmit}>
        <div>
        	<label className="label">Title</label>
        	<input className="input" type="text" name="title" value={title} onChange={this.handleChange}/>
        </div>
        <div>
					<label className="label">Description</label>
        	<textarea className="textarea" type="textarea" name="description" rows="10" value={description} onChange={this.handleChange}/>
        </div>
        <input className="button" type="submit" value="Submit" />

				<p className="alert">{error}</p>

        </form>
				
      </div>
    )
  }
}

export default withAuth(CreateReport);