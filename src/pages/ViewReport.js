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
				console.log(response)
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
			return <div className="card-footer">
				<div className="card-footer-item">
				<button className="button" onClick={this.handleRemove}>Remove report</button>
				</div>
			</div>
			
		}else{
			switch(this.state.report.status){
				case 'open':
				return <div>
					<label>Add a comment:</label>
					<textarea onChange={this.handleChange} value={this.state.comment} name="comment"></textarea>
					<div className="card-footer">
						<div className="card-footer-item">
							<button  className="button" onClick={this.handleClose}>Close report</button>
						</div>
						<div className="card-footer-item">
							<button className="button" onClick={this.handleReject}>Reject report</button>
						</div>
						
						
					</div>
				</div>;
				case 'closed':
				return <div>
					<button className="button" onClick={this.handleReOpen}>Reopen report</button>
				</div>;
				case 'rejected':
				return <div>
					<button className="button" onClick={this.handleReOpen}>Reopen report</button>
				</div>;
			}
		}
	}

	handleComment(){
		if(this.state.report.comment === "" || this.state.report.comment === null){
			return
		}else{
			return <div>
				<label>Comment from the dev:</label>
				<div className="report-description">
				<p>{this.state.report.comment}</p>
			</div>
			</div> 
			
			
		}
	}

  render() {

		const { report } = this.state

    return (
      <div className="card">
				<header className="card-header title1">
				<p className="title is-2">{report.title}</p>
				</header>
				<div className="card-content">
					<label>Website: </label>
					<p className="report-sub">{report.website}</p>
					<label>Report created by: </label>
					<p className="report-sub">{report.hacker}</p>
					<label>Bug explanation:</label>
					<div className="report-description">
						<p className="content">{report.description}</p>
					</div>
						{this.handleComment()}
				</div>
				{this.handleUser()}
      </div>
    )
  }
}

export default withAuth(Report);