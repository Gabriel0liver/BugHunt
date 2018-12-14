import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

const DevRoute = ({ component: Component, user, ...rest}) => {
  if(!user){
    return <Redirect
    to= "/"
  />
  }
  return (
    <Route
      {...rest}
      render={props => {
        return <div>
          { user.type === 'dev' ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          ) }
        </div>
      }}
    />
  );
}

export default withAuth(DevRoute);