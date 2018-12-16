import axios from 'axios';

class Report {
  constructor() {
    this.auth = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  create(report) {
    const { title, website, description } = report;
    return this.auth.post('/reports', {title, website, description})
      .then(({ data }) => {console.log(data)});
  }

  getList(){
    return this.auth.get('/reports')
      .then(({ data}) => data);
  }

  getReport(reportId){
    return this.auth.get('/reports/'+reportId)
      .then(({data}) => data);
  }

  removeReport(reportId){
    return this.auth.delete('/reports/'+reportId)
      .then(({data})=> console.log(data))
  }

  changeReportStatus(reportId,newStatus){
    return this.auth.patch('/reports/'+reportId, {newStatus})
      .then(({data})=> console.log(data))
  }
}

const report = new Report();

export default report