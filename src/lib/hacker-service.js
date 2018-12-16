import axios from 'axios';

class Hacker {
  constructor() {
    this.auth = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  getList(){
    return this.auth.get('/hackers')
      .then(({ data}) => data);
  }

}

const hacker = new Hacker();

export default hacker