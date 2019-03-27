const db = require('../../db/database.js');

const userController = {};


userController.registerUser = (req, res) => {
  const { username, password } = req.body;
  db.query(
    `INSERT INTO users(id, username, password) 
    VALUES($1, $2, $3)`,
    [
      1,
      username,
      password,
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
