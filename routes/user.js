'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user-model');
// const {loggedIn} = require('./auth');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

router.use(bodyParser.json());

function loggedIn(req, res, next) {
  console.log('Request', req.user);
  if(req.user) {
    next();
  } else {
    res.status(401).json({redirect: '../views/login.html', message: 'Please sign in'});
  }
}

//Get all users from database
router.get('/', (req, res) => {
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

// GET for user session (protected, must be signed-in already and have session cookie)
router.get('/me/foobar', loggedIn, (req, res, next) => {
  console.log('I am here!');
  res.json({message: 'hi'});
}
);
//Allow queries for a single user
router.get('/:id', (req, res) => {
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
// router.put('/:id/:userId', loggedIn, (req,res) => {
//   console.log('Hey we got here');
//   User
//     .findByIdAndUpdate(req.params.userId,
//       {$push: {team: `${req.params.id}`}},
//       {new: true})
//     .exec()
//     .then(user => res.status(200).json(user.apiRepr()))
//     .catch(err => res.status(500).send(err));
// });

//Allow the creation of a new user
router.post('/', (req, res) => {
  const requiredFields = ['username', 'email', 'password', 'playerName', 'playerClass'];
  const missingIndex = requiredFields.findIndex(field => !req.body[field]);
  if(missingIndex !== -1) {
    return res.status(400).json({
      message: `Missing field: ${requiredFields[missingIndex]}`
    });
  }

  let {username, password, playerName, email, discord, playerClass} = req.body;

  username = username.trim();
  password = password.trim();

  return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'});
      }
      return User.hashPassword(password);
    })
    .then(hash => {
      return User
        .create({
          username,
          password: hash,
          email,
          discord,
          playerName,
          playerClass
        });
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.send(err);
    });
});


module.exports = router;
