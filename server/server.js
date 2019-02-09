const esprima = require('esprima');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./../webpack.config.js');

const compiler = webpack(config);

// const sequelize = require('sequelize')

const userController = require('./../db/user/userController');
const sessionController = require('./session/sessionController');
const cookieController = require('./util/cookieController');

const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

// app.use('/src', express.static(__dirname + '/src'));

// /////////////////////////////
// connect to Postgres database here
// //////////////////////////

// app.set(//insert react);

app.use(bodyParser.json());
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

// Post to signup page
// app.post('/signup', userController.createUser, sessionController.createJwt);

// Post to login page
// app.post('/login', userController.verifyUser);

// able to see only if logged in
// app.get('/isLoggedin', sessionController.checkJwt, (req, res) => {
//   userController.getAllUsers((err, users) => {
//     if (err) throw err;
//     res.render('./../client/isLoggedIn', { users: users });
//   });
// });

// Oauth process
app.get('/oauth', (req, res) => {
  const code = req.query.code;
  // const clientID = add client ID;
  // const secret = add client secret;

  request.post(
    `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${secret}&code=${code}`,

    (err, response) => {
      const url = `https://api.github.com/user?${response.body}`;

      const options = {
        url,
        headers: {
          'User-Agent': 'request',
          Accept: 'application/vnd.github.v3+json'
        }
      };

      request.get(options, (error, data) => {
        console.log(data);
      });
    }
  );
});

app.post('/parse', (req, res) => {
  const { program } = req.body;
  let criteria = [/setTimeout\((.*)\,(.*)\)/, /console.log\((.*)\)/];
  if (program[program.length - 1] !== ';') return res.json('Error');
  // const result = program.match(/setTimeout\((.*)\,(.*)\)/);
  const newResult = {};

  if (program.match(criteria[0])) {
    let array = program.match(criteria[0]);
    newResult.isAsync = true;
    // newResult.result = program.match(criteria[0]);
    newResult.expression = array[0];
    newResult.callback = array[1];
    newResult.function = array[1].match(criteria[1])[0];
    newResult.output = array[1].match(criteria[1])[1];
    newResult.duration = array[2];
  } else if (program.match(criteria[1])) {
    newResult.isAsync = false;
    newResult.result = program.match(criteria[1]);
  }
  if (newResult.expression) {
    console.log('result is ', newResult);
    return res.json(newResult);
  }
  return res.json('Error');
});

app.listen(3000);

module.exports = app;
