import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

const HackerRoute = ({ component: Component, user, userType, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <div>
          { user.type === 'hacker' ? (
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

export default withAuth(HackerRoute);