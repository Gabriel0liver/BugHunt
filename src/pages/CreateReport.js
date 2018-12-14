import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import report from '../lib/report-service';
import { withAuth } from '../providers/AuthProvider';

class CreateReport extends Component {

	state = {
		title: "",
		dev: "",
		description: "",
		redirect: false,
		error: null
	}
	

	handleSubmit = (event) => {
		event.preventDefault();
    const title = this.state.title;
		const dev = this.state.dev;
		const description = this.state.description;

		report.create({ title, dev, description })
      .then( () => {
				console.log('hettt')
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
			console.log('hey')
			return (<Redirect to="/" />)
		} 
    return (
      <div>
        <h1>Open a new report</h1>
        <form onSubmit={this.handleSubmit}>
        <div>
        	<label>Title</label>
        	<input type="text" name="title" value={title} onChange={this.handleChange}/>
        </div>
        <div>
					<label>Dev</label>
        	<input type="text" name="dev" value={dev} onChange={this.handleChange}/>
        </div>
        <div>
					<label>Description</label>
        	<input type="text" name="description" value={description} onChange={this.handleChange}/>
        </div>
        <input type="submit" value="Submit" />
        </form>
				<p>{error}</p>
      </div>
    )
  }
}

export default withAuth(CreateReport);