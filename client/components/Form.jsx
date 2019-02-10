import React, { useState } from 'react';

function Form({ saveUser }) {
  const [user, setUser] = useState({ userName: '', password: '' });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        saveUser(user);
      }}
    >
      <input
        value={user.userName}
        onChange={e => setUser({ ...user, userName: e.target.value })}
        placeholder="User"
        type="text"
        name="userName"
        required
      />
      <input
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        type="text"
        name="password"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
