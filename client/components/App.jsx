import React, { useState } from 'react';
import SignIn from "./SignIn.jsx";

import InputBox from "./InputBox.jsx"
import CallStack from "./CallStack.jsx"

import '../../css/styles.css'

function App() {

  return (
    <div className='grid-container'>
      <InputBox  className='textBox'  />
      <CallStack className='callbackQueue' color='blue' />
      <CallStack className='callStack' color='yellow' />
      <CallStack className='webApi' color='green'/>
    </div>
  )
}

export default App;