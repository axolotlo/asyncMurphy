import { Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Forum from './Forum.jsx';
import Home from './Home.jsx';

function AppRouter() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/forum' component={Forum} />
    </Router>
  )
}

export default AppRouter;