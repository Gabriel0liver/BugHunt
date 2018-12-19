import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import hackerService from '../lib/hacker-service'
import chatService from '../lib/chat-service'

class AllWebsites extends Component {

  state={
    hackerList: [],
    search: "",
    redirect: false,
    chatId: null
  }

  componentDidMount(){
    hackerService.getList()
      .then(hackerList => {
        this.setState({
          hackerList
        })
        
      })
  }

  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleOpenChat = (hacker) => {
    chatService.create(hacker)
      .then((chatId)=>{
        this.setState({
          chatId,
          redirect: true
        })
      })
  }

  handleRedirect = () =>{
    if(this.state.redirect){
      return <Redirect to={`/chats/${this.state.chatId}`}/>
    }
  }

  render() {

    const searchFiltered = this.state.hackerList.filter(hacker => {
      return hacker.username.includes(this.state.search)
    })

    const hackerList = searchFiltered.map(hacker =>{
      return <li key={hacker._id}><p>{hacker.username}</p><p onClick={() => {
        this.handleOpenChat(hacker._id)
      }}>Open chat</p></li>
    })

    return (
      <div>
        <h1>hackers</h1>
        <label>Search:</label>
        <input type="text" name="search" onChange={this.handleChange} value={this.state.search}/>
        <ul>
          {hackerList}
        </ul>
        {this.handleRedirect()}
      </div>
    )
  }
}

export default withAuth(AllWebsites);