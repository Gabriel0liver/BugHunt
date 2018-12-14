import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import report from '../lib/report-service'

class DevReports extends Component {

  state = {
    reportList: []
  }

  componentDidMount() {
    
    report.getList()
      .then((reports) => {
        console.log(reports)
        const reportList = reports.map(report => {
          return <li key={report._id}><Link to={`/report/${report._id}`}>{report.title}</Link></li>
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
        <ul>
          {reportList}
        </ul>
      </div>
    )
  }
}

export default withAuth(DevReports);