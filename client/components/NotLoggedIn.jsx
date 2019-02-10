import React, { Component } from 'react';
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import LoggedIn from "./LoggedIn.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

class NotLoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div>
      //   Async Murphy Component
      // </div>
      <Router >
        <div>
          <Link to='/signin'>Sign In</Link>
          <Link to='/signup'>Sign Up</Link>

          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/loggedin" component={LoggedIn} />
        </div>
      </Router >
    );
  }
}

export default NotLoggedIn;