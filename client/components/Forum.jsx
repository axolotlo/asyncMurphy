import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom'

const Forum = (props) => {
  console.log(props.location.state)
  const [question, setQuestion] = useState('')

  const handleClick = (event) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.location.state.username,
        question
      })
    })
      .then
  }

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
          Ask a question:<input type="text" value={question} onChange={event => setQuestion(event.target.value)} />
          <button onClick={handleClick}>ADD THREAD</button>
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