import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import chatService from '../lib/chat-service'

import socketManagerClient from "../socketManagerClient";

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
        console.log(data)
        const newMessageList = this.state.messageList.push(data)
        this.setState({
          message: "",
          messageList: newMessageList
        })
        
      })
  }

  handleGetMessages = () => {

    chatService.getMessages(this.props.match.params.id)
      .then(messageList => {
        this.setState({
          messageList
        })
        if(this.messagesEnd !== null){
          this.messagesEnd.scrollIntoView();
        }
      })
  }

  render() {

    const formatedMessages = this.state.messageList.map(message => {
      if(this.props.user.type === message.type){
        return <div key={''+message.time} className="message-text right-message"><p className="text-message"  >{message.text}</p><div className="arrow-right"></div></div>
      }else{
        return <div key={''+message.time} className="message-text left-message"><div className="arrow-left"></div><p className="text-message left"  >{message.text}</p></div>
      }
      
    })

    

    return (
      <div>
        <div>
          <div  className="message-box">
          {formatedMessages}
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
          </div>
          
        </div>
        <form onSubmit={this.handleSendMessage} className="message-form">
          <input autoComplete="off" className="input message-input" placeholder="Write a message" type="text" name="message" onChange={this.handleChange} value={this.state.message}/>
          <input className="button message-button" type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default withAuth(Chat);