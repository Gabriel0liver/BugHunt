import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Home extends Component {

  render() {
    return (
        <div className="home-div">
          <h1 className="title is-1">Bug Hunt</h1>
          <div className="description">
            <p>Bug hunt is a website with the purpose of making hackers and developers life easier.</p>
            <p>Hackers can find and report bugs to developers and d evelopers can offer rewards for these finds, with the purpose of encouraging ethical hacking.</p>
            <p>If a hacker finds a bug in one of our developers websites they can open a report explaining the bug and how they found it, then it is up to the developer to reward the hacker however they find necessary</p>
          </div>
      </div>
    );
  }
}

export default withAuth(Home);