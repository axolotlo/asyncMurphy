import React, { useState, useEffect } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom'

const Forum = (props) => {
  // console.log(props.location.state)
  const [question, setQuestion] = useState('')
  const [threads, setThreads] = useState([]);
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    fetch('/getthreads')
      .then((response) => response.json())
      .then(result => {
        // console.log(result.rows);
        result.rows.forEach((row, i) => {
          setThreads(threads => threads.concat(<p key={i}>{row.username}: {row.question}</p>))
          // console.log(threads)
          // console.log("ROW.QUESTION", row.question);
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