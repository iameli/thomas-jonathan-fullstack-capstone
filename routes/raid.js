'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Raid} = require('../models');

mongoose.Promise = global.Promise;

// router.put('/accept/:id' , (req, res) => {
//   const updated = {};
//   const updateableFields = ['applicants',];
//   updateableFields.forEach(field => {
//     if ( field in req.body) {
//       updated[field] = req.body[field];
//     }
//   });
//
//   Raid
//    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
//    .exec()
//    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
//    .catch(err => res.status(500).json({message: 'Something went wrong'}));
// });

router.put('/updateRaid/:id', (req,res) => {

  const updated = {};
  const updateableFields = req.body.updateFields;
  updateableFields.forEach(field => {
    if ( field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Raid
   .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
   .exec()
   .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
   .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


// router.put('/apply/:id', (req,res) => {
//
// });

router.get('/', (req, res) => {

  Raid
    .find()
    .populate(['leader', 'applicants', 'paladin', 'warrior', 'darkKnight', 'whiteMage', 'scholar', 'astrologian', 'ninja', 'dragoon', 'samurai', 'monk', 'redMage', 'summoner', 'blackMage', 'bard', 'machinist'])
    .exec()
    .then(arrayOfTeams => {
      res.json(arrayOfTeams.map(
          (team) => team.apiRepr()
        )
      );
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/:id', (req, res) => {
  Raid
    .findById(req.params.id)
    .populate(['leader', 'applicants', 'paladin', 'warrior', 'darkKnight', 'whiteMage', 'scholar', 'astrologian', 'ninja', 'dragoon', 'samurai', 'monk', 'redMage', 'summoner', 'blackMage', 'bard', 'machinist'])
    .exec()
    .then(team => {
      res.json(team.apiRepr());
    })
    .catch(err => {
      res.send(err);
    });
});



module.exports = router;
