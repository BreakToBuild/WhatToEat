import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const cookieExists = Cookies.get("csrftoken");
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      cookieExists ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
