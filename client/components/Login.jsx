import React from 'react';

function handleSubmit(event) {
  event.preventDefault();
  fetch('/')
}

function Login() {

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