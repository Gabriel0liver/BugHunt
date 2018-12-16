import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

const AnonRoute = ({ component: Component, isLogged, user, setUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isLogged) {
          return <Component {...props} setUser={setUser} />
        } else {
          if(user.type === 'hacker'){
            return <Redirect to={{ pathname: '/dashboard-hacker', state: { from: props.location } }} />
          }
          return <Redirect to={{ pathname: '/dashboard-dev', state: { from: props.location } }} />
        }
      }
      }
    />
  )
}
export default withAuth(AnonRoute);