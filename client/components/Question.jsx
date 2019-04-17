import React from 'react';
import { withRouter } from 'react-router-dom';

const Question = (props) => {
  // console.log(props);
  const handleClick = (event) => {
    event.preventDefault();
    props.onQuestionClick(props.id, props.user, props.question);
  }
  return (<div onClick={handleClick}>{props.user}: {props.question}</div>)
}

export default withRouter(Question);