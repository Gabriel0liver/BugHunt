import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import reportSerive from '../lib/report-service';

class Report extends Component {

	state = {
		report: {}
	}

	componentDidMount(){
		reportSerive.getReport(this.props.match.params.id)
			.then(response => {
				this.setState({
					report: response
				})
			})
	}

  render() {
		
		const { report } = this.state

    return (
      <div>
				<h1>{report.title}</h1>
				<p>{report.description}</p>
      </div>
    )
  }
}

export default withAuth(Report);