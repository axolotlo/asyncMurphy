import React, { Component } from 'react';
import StackFunction from './StackFunction.jsx';

import '../../css/styles.css';

// function CallStorage(props) {
//   const { storage } = props;
//   return (
//     <div className={this.props.className}>
//       {this.props.className}
//       {storage}
//     </div>
//   );
//}
class CallStorage extends Component {
  componentDidUpdate() {
    this.interval = setTimeout(() => this.setState({ stack: this.props }), 3000);
  }

  render() {
    const { storage, className } = this.props;
    return (
      <div className={className}>
        {className}
        {storage}
      </div>
    );
  }
}

export default CallStorage;
