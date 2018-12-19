import axios from 'axios';

class Report {
  constructor() {
    this.auth = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  create(website) {
    const { title, url } = website;
    return this.auth.post('/websites', {title, url})
      .then(({ data }) => data);
  }

  getList(){
    return this.auth.get('/websites')
      .then(({ data}) => data);
  }

  getWebsite(websiteId){
    console.log(websiteId)
    return this.auth.get('/websites/'+websiteId)
      .then(({data}) => data);
  }

  removeWebsite(websiteId){
    return this.auth.delete('/websites/'+websiteId)
      .then(({data})=> data)
  }
  
}

const report = new Report();

export default report