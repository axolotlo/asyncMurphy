import React, { Component } from 'react';
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,

} from "react-router-dom";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Logged In
      </div>
    );
  }

}

export default LoggedIn;