import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,

} from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);

  }

  login() {
    fakeAuth.authenticate(() => {
      this.props.redirectToReferrer = true;
    });
  };

  render() {
    return (
      <div>
        <p>You must log in to view the page at </p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}


export default SignIn;