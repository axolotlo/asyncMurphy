import React, { Component } from 'react';
import StackFunction from './StackFunction.jsx';

import '../../css/styles.css';

class CallStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: []
    };
  }

  render() {
    const { stack } = this.state;

    return (
      <div className={this.props.className} style={this.state.divStyle}>
        {this.props.className}
        {stack}
      </div>
    );
  }
}

export default CallStack;
