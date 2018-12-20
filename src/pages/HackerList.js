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
      return hacker.username.toLowerCase().includes(this.state.search.toLowerCase())
    })

    const hackerList = searchFiltered.map(hacker =>{
      return <div className="hacker-list-item" key={hacker._id}><p className="hacker-name">{hacker.username}</p><p className="openChat" onClick={() => {
        this.handleOpenChat(hacker._id)
      }}>Open chat</p></div>
    })

    return (
      <div>
        <h1>Hackers</h1>
        <input autoComplete="off" className="input is-rounded" placeholder="Type to search for hackers..." type="text" name="search" onChange={this.handleChange} value={this.state.search}/>
        <div className="hacker-list">
          {hackerList}
        </div>
        {this.handleRedirect()}
      </div>
    )
  }
}

export default withAuth(AllWebsites);