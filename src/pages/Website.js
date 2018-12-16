import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import websiteService from '../lib/website-service'

class MyWebsites extends Component {

  state = {
    website: {},
    removed: false
  }

  componentDidMount(){
    websiteService.getWebsite(this.props.match.params.id)
      .then(website => {
        console.log(website)
        this.setState({
          website
        })
      })
  }

  handleReport = () => {
    return <Redirect to={`/new-report/${this.props.match.params.id}`}/>
  }

  handleRemove = () => {
    websiteService.removeWebsite(this.props.id)
      .then(() => {
        this.setState({
          removed: true
        })
      })
  }

  handleUser = () => {
    if(this.state.removed){
			return <Redirect to='/my-websites' />
		}
		if(this.props.user.type === 'hacker'){
			return <div>
				<Link to={`/new-report/${this.props.match.params.id}`}>Create report</Link>
			</div>;
		}else{
			return <div>
				<button onClick={this.handleRemove}>Remove website</button>
			</div>;
		}
  }

  render() {
    const website = this.state.website
    return (
      <div>
        <h1>{website.title}</h1>
        <p>Url: {website.url}</p>
        {this.handleUser()}
      </div>
    )
  }
}

export default withAuth(MyWebsites);