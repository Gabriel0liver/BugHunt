import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import report from '../lib/report-service'

class HackerReportsRejected extends Component {

  state = {
    reportList: []
  }

  componentDidMount() {
    
    report.getList()
      .then((reports) => {
        const rejectedReports = reports.filter(report => {
          return report.status === 'rejected'
        }) 
        const reportList = rejectedReports.map(report => {
          return <li key={report._id} class="panel-block"><Link to={`/report/${report._id}`}>{report.title}</Link></li>
        })
        this.setState({
          reportList
        })
      })
  }

  render() {

    const reportList = this.state.reportList;

    return (
      <div>
        <h1>My rejected reports</h1>
        <div className="panel">
          {reportList}
        </div>
      </div>
    )
  }
}

export default withAuth(HackerReportsRejected);
