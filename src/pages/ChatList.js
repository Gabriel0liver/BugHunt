import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import chatService from '../lib/chat-service'

class ChatList extends Component {

  state = {
    chatList: []
  }

  componentDidMount() {
    
    chatService.getChats(this.props.user._id)
      .then((chatList) => {
        this.setState({
          chatList
        })
      })
  }

  render() {

    const displayList = this.state.chatList.map((chat)=>{
      return <Link className="panel-block" to={`/chats/${chat.id}`}>{chat.username}</Link>
    })

    return (
      <div>
        <h1>Opened chats</h1>
        <div className="panel">
          {displayList}
        </div>
      </div>
    )
  }
}

export default withAuth(ChatList);