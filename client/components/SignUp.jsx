import React, { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/signup', {
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
      Sign Up Component
      <form>
        Username:<input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        Password:<input type="text" value={password} onChange={event => setPassword(event.target.value)} />
        <input type="button" value="SIGN UP" onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default SignUp;