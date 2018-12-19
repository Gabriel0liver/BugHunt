import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import hackerService from '../lib/hacker-service'
import chatService from '../lib/chat-service'

import socketManagerClient from "../socketManagerClient";
import { format } from 'util';

class Chat extends Component {

  state={
    message:"",
    messageList: [],
    firstGet: true
  }

  componentDidMount(){
    this.handleGetMessages();
    socketManagerClient.initSocketUser(this.props.match.params.id);
    let socket = socketManagerClient.getSocket();
    socket.on("NEW_MESSAGE", () => {
       this.handleGetMessages();
    });
  }

  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSendMessage = (event) => {
    event.preventDefault();
    chatService.postMessage(this.props.match.params.id, this.state.message)
      .then((data) => {
        this.setState({
          message: ""
        })
        
      })
  }

  handleGetMessages = () => {

    chatService.getMessages(this.props.match.params.id)
      .then(messageList => {
        this.setState({
          messageList
        })
        console.log(this.state)
        if(this.messagesEnd !== null){
          this.messagesEnd.scrollIntoView();
        }
      })
  }

  render() {

    const formatedMessages = this.state.messageList.map(message => {
      if(this.props.user.type === message.type){
        return <li key={''+message.time} className="right-message">{message.text}</li>
      }else{
        return <li key={''+message.time} className="left-message">{message.text}</li>
      }
      
    })

    

    return (
      <div>
        <div className="message-box">
          <div>
          {formatedMessages}
          </div>
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <form onSubmit={this.handleSendMessage}>
          <input type="text" name="message" onChange={this.handleChange} value={this.state.message}/>
          <input className="button" type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default withAuth(Chat);