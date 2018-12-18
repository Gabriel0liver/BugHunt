import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import report from '../lib/report-service'

class DevReportsOpen extends Component {

  state = {
    reportList: []
  }

  componentDidMount() {
    
    report.getList()
      .then((reports) => {
        const openReports = reports.filter(report => {
          return report.status === 'open'
        }) 
        const reportList = openReports.map(report => {
          return <li key={report._id} className="panel-block"><Link to={`/report/${report._id}`}>{report.title}</Link></li>
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
        <h1>Open Reports</h1>
        <div className="panel">
          {reportList}
        </div>
      </div>
    )
  }
}

export default withAuth(DevReportsOpen);