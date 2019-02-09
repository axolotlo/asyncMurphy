import React, { useState } from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        if (response === 'Error') this.props.outputError(true);
        else this.props.outputError(false);
        //if async
        //callback queue
        // this.props.updateStorage('callBackQueue', response[0]);
        // setTimeout(() => {
        //   this.props.popStack('callBackQueue');
        // }, 5000);
        //callStack
        // this.props.updateStorage('callStack', response[0]);
        // setTimeout(() => {
        //   this.props.popStack('callStack');
        // }, 5000);
        // //webapi
        // this.props.updateStorage('webApi', response[0]);
        // setTimeout(() => {
        //   this.props.popStack('webApi');
        // }, 5000);
        console.log(response);
        //else (not async)
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
