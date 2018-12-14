import axios from 'axios';

class Report {
  constructor() {
    this.auth = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  create(report) {
    const { title, dev, description } = report;
    return this.auth.post('/reports', {title, dev, description})
      .then(({ data }) => {console.log(data)});
  }
}

const report = new Report();

export default report