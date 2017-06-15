'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {User} = require('../models/user-model');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

router.use(bodyParser.json());


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

// router.post('/:id', (req, res) => {
//   const requiredFields = ['username', 'email', 'password', 'playerName'];
//   const missingIndex = requiredFields.findIndex(field => !req.body[field]);
//   if(missingIndex !== -1) {
//     return res.status(400).json({
//       message: `Missing field: ${requiredFields[missingIndex]}`
//     });
//   }
//
//   let {username, password, playerName, email, discord, playerClass} = req.body;
//
//   username = username.trim();
//   password = password.trim();
//
//
//   return User
//     .find({username})
//     .count
//     .exec()
//     .then(count => {
//       if (count > 0) {
//         return res.status(422).json({message: 'username already taken'});
//       }
//       return User.hashPassword(password);
//     })
//     .then(hash => {
//       return User
//         .create({
//           username,
//           password: hash,
//           email,
//           discord,
//           playerName,
//           playerClass
//         });
//     })
//     .then(user => {
//       return res.status(201).json(user.apiRepr());
//     })
//     .catch(err => {
//       res.send(err);
//     });
// });


module.exports = router;
