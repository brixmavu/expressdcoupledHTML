var express = require('express');
var router = express.Router();
const path = require('path');
const connection = require('../config')

/* GET login page. */
router.get('/login', function(req, res) {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* POST login page. */
router.post('/login', function(req, res) {
  // Retrieve the user's input from the form
  const username = req.body.username;
  const password = req.body.password;

  // Check the database for a matching username and password
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results) {
    if (error) {
      throw error;
    }

    if (results.length > 0) {
      // Login successful
      res.redirect('/');
    } else {
      // Login failed
      res.send('Incorrect username or password');
    }
  });
});

/* GET register page. */
router.get('/register', function(req, res) {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* POST register page. */
router.post('/register', function(req, res) {
  // Retrieve the user's input from the form
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // Insert the new user into the database
  connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(error) {
    if (error) {
      throw error;
    }
    res.redirect('/login');
  });
});



module.exports = router;
