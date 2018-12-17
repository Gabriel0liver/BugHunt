import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import hackerService from '../lib/hacker-service'
import chatService from '../lib/chat-service'

class AllWebsites extends Component {

  state={
    hackerList: [],
    search: ""
  }

  componentDidMount(){
    hackerService.getList()
      .then(hackerList => {
        console.log(hackerList)
        this.setState({
          hackerList
        })
        
      })
  }

  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleOpenChat = (hackerId) => {
    chatService.create(hackerId)
      .then(()=>{
        
      })
  }

  render() {

    const searchFiltered = this.state.hackerList.filter(hacker => {
      return hacker.username.includes(this.state.search)
    })

    const hackerList = searchFiltered.map(hacker =>{
      return <li key={hacker._id}><p>{hacker.username}</p><p onClick={this.handleOpenChat(hacker._id)}>Open chat</p></li>
    })

    return (
      <div>
        <h1>hackers</h1>
        <label>Search:</label>
        <input type="text" name="search" onChange={this.handleChange} value={this.state.search}/>
        <ul>
          {hackerList}
        </ul>
      </div>
    )
  }
}

export default withAuth(AllWebsites);