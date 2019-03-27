import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  }

  return (
    <div>
      Log in Component
      <form>
        Username:<input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        Password:<input type="text" value={password} onChange={event => setPassword(event.target.value)} />
        <input type="button" value="LOGIN" onClick={handleSubmit} />
      </form>
    </div >
  )
}

export default Login;