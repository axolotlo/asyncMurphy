const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
//const sequelize = require('sequelize')

const userController = require('./../db/user/userController');
const sessionController = require('./session/sessionController')
const cookieController = require('./util/cookieController');

const app = express();

///////////////////////////////
//connect to Postgres database here
////////////////////////////

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Render to index file
app.get('/', cookieController.setCookie, (req, res) => {
  res.render('./../client/index');
});

// Render to signup page
app.get('/signup', (req, res) => {
  res.render('./../client/signup', { error: null });
});

//Post to signup page
app.post('/signup', userController.createUser, sessionController.createJwt);

//Post to login page
app.post('/login', userController.verifyUser);

//able to see only if logged in
app.get('/isLoggedin', sessionController.checkJwt, (req, res) => {
  userController.getAllUsers((err, users) => {
    if (err) throw err;
    res.render('./../client/isLoggedIn', { users: users });
  });
});

//Oauth process
app.get('/oauth', (req, res) => {
  const code = req.query.code;
  //const clientID = add client ID;
  //const secret = add client secret;

  request.post(
    `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${secret}&code=${code}`,

    (err, response) => {
      const url = 'https://api.github.com/user?' + response.body;

      const options = {
        url, headers: {
          'User-Agent': 'request',
          Accept: 'application/vnd.github.v3+json'
        }
      };

      request.get(options, (error, data) => {
        console.log(data);
      })
    }
  );
});

app.listen(3000);

module.exports = app;