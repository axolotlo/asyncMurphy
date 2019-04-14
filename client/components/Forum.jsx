import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'

const Forum = (props) => {
  console.log("FORUM HERE")
  console.log(props.location.state)

  const logout = () => {
    props.location.state.isLoggedIn = false;
    console.log(props.location.state.isLoggedIn);
    props.location.state.setLoggedIn(false);
  }
  // return (<div>forum</div>)
  return (props.location.state.isLoggedIn) ?
    (
      <div>
        <div>USER: {props.location.state.username}</div>
        <input type="button" value="LOG OUT" onClick={logout} />
        <div id="threads">
          <button>ADD THREAD</button>

        </div>
      </div>
    ) :
    (
      <Redirect to={{
        pathname: "/login",
        state: { isLoggedIn, setLoggedIn }
      }} />
    )
      (<div>hi</div>)
}

export default withRouter(Forum);