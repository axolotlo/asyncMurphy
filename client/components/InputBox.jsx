import React, { useState } from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/parse', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({program: this.state.value}), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.log(error))// parses response to JSON
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmit}>
          <textarea name="textarea" rows="10" cols="50" 
            value={this.state.value} onChange={this.handleChange} ></textarea>
          <br />
          <input type = "submit"/>
        </form>

        
      </div>
    )
  }

}

export default InputForm;