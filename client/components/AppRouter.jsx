import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

function AppRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
        </ul>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />

      </div>
    </Router>
  )
}

export default AppRouter;