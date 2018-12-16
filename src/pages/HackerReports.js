import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import report from '../lib/report-service'

class HackerReports extends Component {

  state = {
    reportList: []
  }

  componentDidMount() {
    
    report.getList()
      .then((reports) => {
        console.log(reports)
        const reportList = reports.map(report => {
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
        <h1>My reports</h1>
        <div className="panel">
          {reportList}
        </div>
      </div>
    )
  }
}

export default withAuth(HackerReports);
