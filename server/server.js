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

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

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
      const url = `https://api.github.com/user?${  response.body}`;

      const options = {
        url,
headers: {
          'User-Agent': 'request',
          Accept: 'application/vnd.github.v3+json',
        },
      };

      request.get(options, (error, data) => {
        console.log(data);
      });
    },
  );
});

app.post('/parse', (req, res) => {
  const { program } = req.body;
  console.log(program);
  const script = esprima.parseScript(program);
  // script.body.forEach((element) => {
  //   console.log('type', element.type);
  //   console.log('expression', element.expression);
  //   console.log('arguments', element.expression.arguments);
    console.log('arg1', element.expression.arguments[0].body.body[0].expression);
  //   console.log('arg2', element.expression.arguments[1].value);

  // });
});


app.listen(3000);

module.exports = app;
