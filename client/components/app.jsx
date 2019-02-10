import React, { Component } from 'react';
import NotLoggedIn from "./NotLoggedIn.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,

} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      fakeAuth: {
        isAuthenticated: false,
        authenticate(cb) {
          this.isAuthenticated = true;
          setTimeout(cb, 100); // fake async
        },
        signout(cb) {
          this.isAuthenticated = false;
          setTimeout(cb, 100);
        }
      },
      AuthButton: withRouter(
        ({ history }) =>
          fakeAuth.isAuthenticated ? (
            <p>
              Welcome!{" "}
              <button
                onClick={() => {
                  fakeAuth.signout(() => history.push("/"));
                }}
              >
                Sign out
              </button>
            </p>
          ) : (
              <p>You are not logged in.</p>
            )
      ),
      PrivateRoute: ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            fakeAuth.isAuthenticated ? (
              <Component {...props} />
            ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )
          }
        />
      ),

    };
  }

  render() {
    return (
      // <div>
      //   Async Murphy Component
      // </div>
      <NotLoggedIn theState={this.state} />
    );
  }

}


export default App;