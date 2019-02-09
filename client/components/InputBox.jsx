import React, { useState } from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two seconds later');
  }

  async flow(response) {
    console.log('RESPONSE IS ', response.result);
    //settimeout is hard coded for illustrative purposes
    //callback queue
    this.props.updateStorage('callBackQueue', response.result[0]);
    await this.sleep(2000);

    this.props.updateStorage('callStack', response.result[0]);
    await this.sleep(2000);

    this.props.updateStorage('webApi', response.result[1]);
    await this.sleep(response.result[2]);

    this.props.updateStorage('callBackQueue', response.result[1]);
    await this.sleep(2000);
    let callback = response.result[1];

    this.props.updateStorage('callStack', response.result[1]);
    await this.sleep(2000);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ program: this.props.textBoxValue }) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(response => {
        console.log('response is ', response);
        //didn't have time to do conditional rendering so this isn't pretty but works
        if (response === 'Error') {
          this.props.outputError(true);
          return;
        }
        this.props.outputError(false);
        if (response.isAsync) {
          this.flow(response);
          //   console.log('RESPONSE IS ', response.result);
          //   //settimeout is hard coded for illustrative purposes
          //   //callback queue
          //   this.props.updateStorage('callBackQueue', response.result);
          //   // setTimeout(() => {
          //   //   this.props.popStack('callBackQueue');
          //   // }, 1000);
          //   // callStack
          //   this.props.updateStorage('callStack', response.result[0]);
          //   // setTimeout(() => {
          //   //   this.props.popStack('callStack');
          //   // }, 1000);
          //   //webapi
          //   this.props.updateStorage('webApi', response.result[1]);
          //   // setTimeout(() => {
          //   //   this.props.popStack('webApi');
          //   // }, response[2]);
          //   //callback queue
          //   this.props.updateStorage('callBackQueue', response.result[1]);
          //   // setTimeout(() => {
          //   //   this.props.popStack('callBackQueue');
          //   // }, 1000);
          //   // callStack
          //   this.props.updateStorage('callStack', response.result[1]);
          //   // setTimeout(() => {
          //   //   this.props.popStack('callStack');
          //   // }, 1000);
          // }

          //else (not async)
        }
      })
      .catch(error => console.log(error)); // parses response to JSON
  }

  render() {
    const { handleChange, className, textBoxValue, error } = this.props;
    return (
      <div className={className}>
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="textarea"
            rows="10"
            cols="50"
            value={textBoxValue}
            onChange={handleChange}
          />
          <br />
          <input type="submit" />
        </form>
        <p>{error}</p>
      </div>
    );
  }
}

export default InputForm;
