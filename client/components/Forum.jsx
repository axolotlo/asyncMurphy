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
  return (props.location.state.isLoggedIn) ? 
  (
    <div>USER: 
      <input type="button" value="LOG OUT" onClick={logout}/>
    </div>
  ) :
  (
    <Redirect to={{
      pathname: "/login",
      state: { isLoggedIn, setLoggedIn }
    }}/>
  )
}

export default withRouter(Forum);