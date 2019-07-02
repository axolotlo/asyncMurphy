import React from 'react';
import { withRouter } from 'react-router-dom';

const Thread = (props) => {
  console.log(props);
  return (<h1>{props.location.state.user}: {props.location.state.question}</h1>)
}

export default withRouter(Thread);