import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Redirect } from 'react-router-dom';
import reportService from '../lib/report-service';

class Report extends Component {

	state = {
		report: {},
		removed: false
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
		reportService.changeReportStatus(this.props.match.params.id,'closed')
	}

	handleReject = () =>{
		reportService.changeReportStatus(this.props.match.params.id,'rejected')
	}

	handleRemove = () => {
		reportService.removeReport(this.props.match.params.id)
			.then(()=>{
				this.setState({
					removed: true
				})
			})
	}

	handleUser(){
		if(this.state.removed){
			return <Redirect to='/my-reports' />
		}
		if(this.props.user.type === 'hacker'){
			return <div>
				<button onClick={this.handleRemove}>Remove report</button>
			</div>;
		}else{
			return <div>
				<button onClick={this.handleClose}>Close report</button>
				<button onClick={this.handleReject}>Reject report</button>
			</div>;
		}
	}

  render() {
		
		const { report } = this.state

    return (
      <div>
				<h1>{report.title}</h1>
				<p>{report.description}</p>
				{this.handleUser()}
      </div>
    )
  }
}

export default withAuth(Report);