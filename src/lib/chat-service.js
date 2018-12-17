import axios from 'axios';

class Chat {
  constructor() {
    this.chat = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  create(hackerId) {
    return this.chat.post('/chats', {hackerId})
      .then(({ data }) => {console.log(data)});
  }
}

const chat = new Chat();

export default chat