const pg = require('pg');

const uri = 'postgres://kxbqoeqd:IajTSlcZvoJDOZkl4fpTI47RfmwdFWL3@isilo.db.elephantsql.com:5432/kxbqoeqd';

const client = new pg.Client(uri);
client.connect();

const createQuery = `
  CREATE TABLE IF NOT EXISTS users (
    _id serial PRIMARY KEY,
    username VARCHAR(450) NOT NULL,
    password VARCHAR(450) NOT NULL
  )
`;

client.query(createQuery, (err) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log('CREATED USER TABLE');
  }
});

module.exports = {
  query(text, params, callback) {
    return client.query(text, params, callback);
  },
};
