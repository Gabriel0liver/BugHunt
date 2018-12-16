import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Redirect } from 'react-router-dom';
import reportService from '../lib/report-service';

class Report extends Component {

	state = {
		report: {},
		removed: false,
		comment: ''
	}

	componentDidMount(){
		reportService.getReport(this.props.match.params.id)
			.then(response => {
				this.setState({
					report: response
				})
			})
	}

	handleClose = () =>{
		reportService.changeReportStatus(this.props.match.params.id,'closed',this.state.comment)
		.then(()=>{
			this.props.history.goBack()
		})
	}

	handleReject = () =>{
		reportService.changeReportStatus(this.props.match.params.id,'rejected',this.state.comment)
		.then(()=>{
			this.props.history.goBack()
		})
		
	}

	handleReOpen = () =>{
		reportService.changeReportStatus(this.props.match.params.id,'open')
			.then(()=>{
				this.props.history.goBack()
			})
	}

	handleRemove = () => {
		reportService.removeReport(this.props.match.params.id)
			.then(()=>{
				this.props.history.goBack()
			})
	}

	handleChange = (event) => {
		const {name, value} = event.target;
    this.setState({[name]: value});
	}

	handleUser(){
		if(this.state.removed){
			return <Redirect to='/dashboard-hacker' />
		}
		if(this.props.user.type === 'hacker'){
			return <div>
				<button onClick={this.handleRemove}>Remove report</button>
			</div>;
		}else{
			switch(this.state.report.status){
				case 'open':
				return <div>
					<label>Add a comment:</label>
					<textarea onChange={this.handleChange} value={this.state.comment} name="comment"></textarea>
					<button onClick={this.handleClose}>Close report</button>
					<button onClick={this.handleReject}>Reject report</button>
				</div>;
				case 'closed':
				return <div>
					<button onClick={this.handleReOpen}>Reopen report</button>
				</div>;
				case 'rejected':
				return <div>
					<button onClick={this.handleReOpen}>Reopen report</button>
				</div>;
			}
		}
	}

  render() {

		const { report } = this.state

    return (
      <div>
				<h1>{report.title}</h1>
				<p>{report.description}</p>
				<label>comment:</label>
				<p>{report.comment}</p>
				{this.handleUser()}
      </div>
    )
  }
}

export default withAuth(Report);