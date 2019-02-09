import React, { Component } from 'react';
import SignIn from './SignIn.jsx';

import InputBox from './InputBox.jsx';
import CallStorage from './CallStorage.jsx';

import '../../css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callStack: [],
      callBackQueue: [],
      webApi: []
    };
  }

  render() {
    const { callStack, callBackQueue, webApi } = this.state;
    return (
      <div className="grid-container">
        <InputBox className="textBox" />
        <CallStorage className="callbackQueue" storage={callStack} />
        <CallStorage className="callStack" storage={callBackQueue} />
        <CallStorage className="webApi" storage={webApi} />
      </div>
    );
  }
}

export default App;
