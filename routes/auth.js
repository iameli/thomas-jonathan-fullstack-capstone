'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {User} = require('../models/user-model');
const bodyParser = require('body-parser');
const passport = require('passport');
const {BasicStrategy} = require('passport-http');

//Basic authentication strategy
const strategy = new BasicStrategy(function(username, password, callback) {
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user);
      }
    });
});

router.use(require('express-session')({
  secret: 'something something',
  resave: false,
  saveUninitialized: false
}));

passport.use(BasicStrategy);
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

function loggedIn(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.json({redirect: '../views/login.html', message: 'Please sign in'});
  }
}

// GET for user to sign in
router.get('/login',
	passport.authenticate('basic', {session: true, failureRedirect: '/login.html'}),
		(req, res) => {
  console.log('hello');
  res.json({user: req.user.apiRepr(), message: 'Sign in successful'});
}
);

// GET for user session (protected, must be signed-in already and have session cookie)
router.get('/me', loggedIn, (req, res, next) => {
  res.json({user: req.user.apiRepr()});
}
);

// GET for user to sign out
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

module.exports = router;
