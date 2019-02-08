import React, { useState } from 'react';
import Form from './Form.jsx';

function SignIn() {
  function saveUser(user) {
    //Save user to database here??
  }
  return (
    <div>
      Sign in Component
      <Form saveUser={saveUser} />
    </div>
  );
}

export default SignIn;
