import React, { useState } from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async asyncFlow(response, duration) {
    console.log('RESPONSE IS ', response);
    //settimeout is hard coded for illustrative purposes
    //callback queue
    this.props.updateStorage('callBackQueue', response.expression, duration);
    await this.sleep(duration);

    this.props.updateStorage('callStack', response.callback, duration);
    await this.sleep(duration);

    this.props.updateStorage('webApi', response.callback, response.duration);
    await this.sleep(response.duration);

    this.props.updateStorage('callBackQueue', response.function, duration);
    await this.sleep(duration);

    this.props.updateStorage('callStack', response.function, duration);
    await this.sleep(duration);

    this.props.updateStorage('output', response.output);
    // await this.sleep(duration);
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
          this.asyncFlow(response, 1000);
        }
        //IF NOT ASYNC
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
