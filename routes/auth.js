'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {User} = require('../models/user-model');
const {Raid} = require('../models/raid-model');
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
    })
    .catch(err => console.log('Invalid username or password'));
});

router.use(require('express-session')({
  secret: 'something something',
  resave: false,
  saveUninitialized: false
}));

passport.use(strategy);
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
  console.log('Hello');
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

router.get('/user', (req, res) => {
  return User
    .find()
    .populate('team')
    .exec()
    .then(users => {
      res.status(200).json(users.map(
          (user) => user.apiRepr()
        )
      );
    })
    .catch(err => {
      res.send(err);
    });
});

//Allow queries for a single user
router.get('/user/:id', (req, res) => {
  return User
    .findById(req.params.id)
    .populate('team')
    .exec()
    .then(user => {
      res.json(user.apiRepr());
    })
    .catch(err => {
      res.send(err);
    });
});


// Update what team the user is on for when they are accepted on a team
router.put('/user/:id/:userId', loggedIn, (req,res) => {
  User
    .findByIdAndUpdate(req.params.userId,
      {$push: {team: `${req.params.id}`}},
      {new: true})
    .exec()
    .then(user => res.status(200).json(user.apiRepr()))
    .catch(err => res.status(500).send(err));
});

//PUT (password protected, must have session cookie) for adding a player to applicants
router.put('/raid/:id/:userId', loggedIn, (req, res) => {
  Raid
   .findByIdAndUpdate(req.params.id, {$push: { applicants: req.params.userId } }, {new: true})
   .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
   .exec()
   .then(raid => res.status(200).json(raid.apiRepr()))
   .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

//POST (password protected, must have session cookie) for adding an applicant to a job.
router.post('/raid/:teamId/:fieldName/:playerId', loggedIn, (req, res) => {
  //validation
  Raid
    .findByIdAndUpdate(req.params.teamId,
      { $push: { [req.params.fieldName]: req.params.playerId } },
      {new: true})
    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
    .exec()
    .then(response => res.status(200).json(response.apiRepr()));
});

//DELETE (password protected, must have session cookie) for removing a player from a raid field
router.delete('/raid/:teamId/:fieldName/:playerId',loggedIn, (req, res) => {
  //validation

  Raid
    .findByIdAndUpdate(req.params.teamId,
      { $pull: { [req.params.fieldName]: req.params.playerId } },
      {new: true})
    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
    .exec()
    .then(updatedTeam => res.status(200).json(updatedTeam.apiRepr()));
});

module.exports = {router, loggedIn};
