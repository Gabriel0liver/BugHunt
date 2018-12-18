import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import hackerService from '../lib/hacker-service'
import chatService from '../lib/chat-service'

import socketManagerClient from "../socketManagerClient";

class Chat extends Component {

  state={
    message:"",
    messageList: []
  }

  componentDidMount(){
    this.handleGetMessages();
    socketManagerClient.initSocketUser(this.props.match.params.id);
    let socket = socketManagerClient.getSocket();
    socket.on("NEW_MESSAGE", () => {
       console.log('ndsjnjds')
       this.handleGetMessages();
    });
  }

  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSendMessage = () => {
    chatService.postMessage(this.props.match.params.id, this.state.message)
      .then((data) => {
        
      })
  }

  handleGetMessages = () => {
    chatService.getMessages(this.props.match.params.id)
      .then(messageList => {
        this.setState({
          messageList
        })
      })
  }

  render() {

    console.log(this.state.messageList)

    return (
      <div>
        <input type="text" name="message" onChange={this.handleChange} value={this.state.message}/>
        <button onClick={this.handleSendMessage}>Send message</button>
      </div>
    )
  }
}

export default withAuth(Chat);