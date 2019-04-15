const bcyrpt = require('bcrypt');
const db = require('../../db/database.js');

const userController = {};


userController.registerUser = (req, res) => {
  const { username, password } = req.body;
  bcyrpt.hash(password, 10, (err, hash) => {
    db.query(
      `INSERT INTO users(username, password) 
      VALUES($1, $2)`,
      [
        username,
        hash,
      ],
      (err) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log('CREATED USER', username);
        }
      },
    );
  });
};

userController.authenticateUser = (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT password FROM users WHERE username = $1',
    [
      username,
    ],
    (err, result) => {
      if (err) {
        console.log(err.stack);
      } else if (!result.rows.length) {
        console.log('USER NOT FOUND');
        res.send('USER NOT FOUND');
      } else {
        // console.log(result);
        // console.log(result.rows[0]);
        // console.log('GOT BACK USER', username);
        bcyrpt.compare(password, result.rows[0].password, (err, result2) => {
          if (err) {
            console.log(err);
          } else if (result2) {
            console.log('LOGGED IN!');
            console.log(result.rows[0]);
            res.send(username);
          } else {
            console.log('WRONG PW!');
            res.send('WRONG PW');
          }
        });
      }
    },
  );
};

userController.userStartThread = (req, res) => {
  const { username, question } = req.body;
  db.query(
    `INSERT INTO users(username, password) 
    VALUES($1, $2)`,
    [
      username,
      hash,
    ],
    (err) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log('CREATED USER', username);
      }
    },
  );
};

module.exports = userController;
