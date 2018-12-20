import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import website from '../lib/website-service'

class Websites extends Component {

  state={
    websiteList: [],
    search: ""
  }

  componentDidMount(){
    website.getList()
      .then(websiteList => {
        this.setState({
          websiteList
        })
        
      })
  }

  handleChange = (event) =>{
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {

    const searchFiltered = this.state.websiteList.filter(website => {
      return website.title.includes(this.state.search.toLowerCase() || this.state.search.toUpperCase())
    })

    const websiteList = searchFiltered.map(website =>{
      return <p className="website-li" key={website._id}><Link className="website-link" to={`/website/${website._id}`} >{website.title}</Link></p>
    })

    return (
      <div>
        <h1>Websites</h1>
        <input autoComplete="off" type="text" name="search"  placeholder="Search for a website..." className="input is-rounded"onChange={this.handleChange} value={this.state.search}/>
        <div className="website-list">
          {websiteList}
        </div>
      </div>
    )
  }
}

export default withAuth(Websites);