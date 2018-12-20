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
        this.setState({
          website
        })
      })
  }

  handleReport = () => {
    return <Redirect  to={`/new-report/${this.props.match.params.id}`}/>
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
				<Link className="button"to={`/new-report/${this.props.match.params.id}`}>Create report</Link>
			</div>;
		}else{
			return <div>
				<button className="button remove-button" onClick={this.handleRemove}>Remove website</button>
			</div>;
		}
  }

  render() {
    const website = this.state.website
    return (
      <div>
        <h1 className="website-title">{website.title}</h1>
        <div className="website-content">
          <div className="url-div">
          <label className="website-url">Url:</label>
          <a href={'https://'+website.url}>{' '+website.url}</a>
          </div>
          {this.handleUser()}
        </div>
        
        
      </div>
    )
  }
}

export default withAuth(MyWebsites);