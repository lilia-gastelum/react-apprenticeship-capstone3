import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../utils/providers/Auth.provider";


// eslint-disable-next-line react/prop-types
function Private({ children, ...rest }) {
  const { authenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (authenticated ? children : <Redirect to="/login" />)}
    />
  );
}

export default Private;
