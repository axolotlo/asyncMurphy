import React from 'react';
import {Link} from 'react-router-dom';
function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
      </ul>
    </div>

  )
}

export default Home;