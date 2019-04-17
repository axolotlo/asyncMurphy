import React, { useState, useEffect } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Question from './Question.jsx';

const Forum = (props) => {
  const [question, setQuestion] = useState('')
  const [threads, setThreads] = useState([]);
  const [isClicked, setClicked] = useState(false);

  const redirectTo = (id, user, question) => {
    props.history.push({
      pathname: '/thread/' + id,
      state: { user, question }
    })
  }

  useEffect(() => {
    fetch('/getthreads')
      .then((response) => response.json())
      .then(result => {
        result.rows.forEach(row => {
          setThreads(threads => threads.concat(<Question key={row._id} id={row._id} onQuestionClick={redirectTo} user={row.username} question={row.question}></Question>))
        })
      });
  }, [isClicked])

  const handleClick = (event) => {
    event.preventDefault();
    setThreads([]);
    setClicked(!isClicked);

    if (question) {
      fetch('/newthread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: props.location.state.username,
          question
        })
      })
        .then(() => {
          console.log("SUCCESSFULLY ADDED THREAD TO DATABASE");
        });
    } else {
      console.log("Can't ask an empty question!");
    }
  }

  const testParam = () => {
    fetch('/thread/1');
  }

  const logout = () => {
    props.location.state.isLoggedIn = false;
    console.log(props.location.state.isLoggedIn);
    props.location.state.setLoggedIn(false);
  }


  // return (<div>forum</div>)
  return (props.location.state.isLoggedIn) ?
    (
      <div>
        <div>USER: {props.location.state.username}</div>
        <input type="button" value="LOG OUT" onClick={logout} />
        <div id="threads">
          Ask a question:<input type="text" value={question} onChange={event => setQuestion(event.target.value)} />
          <button onClick={handleClick}>ADD THREAD</button>
          <button onClick={testParam}>TEST PARAM</button>
          {threads}
        </div>
      </div>
    ) :
    (
      <Redirect to={{
        pathname: "/login",
        state: { isLoggedIn, setLoggedIn }
      }} />
    )
}

// function getThreads() {



//   return threads;
// }


export default withRouter(Forum);