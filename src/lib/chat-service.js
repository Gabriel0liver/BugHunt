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
      .then(({ data }) => data);
  }

  getMessages(chatId) {
    return this.chat.get(`/chats/${chatId}`)
      .then(({ data }) => data);
  }

  postMessage(chatId, message) {
    return this.chat.post(`/chats/${chatId}`, {message})
    .then(({ data }) => data);
  }

}

const chat = new Chat();

export default chat