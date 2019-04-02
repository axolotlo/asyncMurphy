import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Forum from './Forum.jsx';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(data => {
        // console.log(data.text());
        return data.text();
      })
      .then(result => {
        console.log("THIS IS THE RESULT");
        console.log(result);
        setLoggedIn(true);
        console.log("hi")
      })
  }

  return (!isLoggedIn) ? 
  (  
    <div>
      Log in Component
      <form>
        Username:<input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        Password:<input type="text" value={password} onChange={event => setPassword(event.target.value)} /> 
        <input type="button" value="LOGIN" onClick={handleSubmit} />
      </form>
    </div >
  ) :
  (
    <Redirect to={{
      pathname: "/forum",
      state: { isLoggedIn, setLoggedIn }
    }}/>
  )
}

export default withRouter(Login);