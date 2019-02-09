import React, { Component } from 'react';
import SignIn from './SignIn.jsx';

import InputBox from './InputBox.jsx';
import CallStorage from './CallStorage.jsx';
import StackFunction from './StackFunction.jsx';

import '../../css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callStack: [],
      callBackQueue: [],
      webApi: [],
      textBoxValue: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
    // this.popStack = this.popStack.bind(this);
    this.outputError = this.outputError.bind(this);
  }

  handleChange(event) {
    this.setState({ textBoxValue: event.target.value });
  }

  updateStorageMaker() {
    let count = 0;
    let flow = { callBackQueue: 'callStack', callStack: 'webApi', webApi: 'callBackQueue' };
    return (id, element) => {
      if (count < 5) {
        this.updateStorage(id, element);
      }
    };
  }

  updateStorage(id, element, count) {
    console.log('id', id);
    console.log('element', element);
    const copyStorage = [...this.state[id]];
    copyStorage.push(<StackFunction name={element} />);
    this.setState({ [id]: copyStorage });

    setTimeout(async () => {
      const copyStorage2 = [...this.state[id]];
      copyStorage2.pop();
      this.setState({ [id]: copyStorage2 });
    }, 2000);
  }

  // popStack(id) {
  //   console.log('id', id);
  //   const copyStorage = [...this.state[id]];
  //   copyStorage.pop();
  //   this.setState({ [id]: copyStorage });
  // }

  outputError(isError) {
    if (isError) this.setState({ error: 'Error parsing. Must use Airbnb styling guide.' });
    else this.setState({ error: '' });
  }

  render() {
    const { callStack, callBackQueue, webApi, textBoxValue, error } = this.state;
    return (
      <div className="grid-container">
        <InputBox
          className="textBox"
          textBoxValue={textBoxValue}
          handleChange={this.handleChange}
          callStack={callStack}
          callBackQueue={callBackQueue}
          webApi={webApi}
          error={error}
          updateStorage={this.updateStorage}
          popStack={this.popStack}
          outputError={this.outputError}
        />
        <CallStorage popStack={this.popStack} className="callBackQueue" storage={callBackQueue} />
        <CallStorage popStack={this.popStack} className="callStack" storage={callStack} />
        <CallStorage popStack={this.popStack} className="webApi" storage={webApi} />
      </div>
    );
  }
}

export default App;
