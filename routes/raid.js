'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Raid} = require('../models');

mongoose.Promise = global.Promise;
router.use(bodyParser.json());

router.put('/:id', (req,res) => {
  const updated = {};
  const updateableData = Object.keys(req.body);
  updateableData.forEach(field => {
    if ( field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Raid
   .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
   .populate(['leader', 'applicants', 'paladins', 'warriors', 'darkKnights', 'whiteMages', 'scholars', 'astrologians', 'ninjas', 'dragoons', 'samurais', 'monks', 'redMages', 'summoners', 'blackMages', 'bards', 'machinists'])
   .exec()
   .then(raid => res.status(201).json(raid.apiRepr()))
   .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


// router.put('/apply/:id', (req,res) => {
//
// });

router.get('/', (req, res) => {

  Raid
    .find()
    .populate(['leader', 'applicants', 'paladins', 'warriors', 'darkKnights', 'whiteMages', 'scholars', 'astrologians', 'ninjas', 'dragoons', 'samurais', 'monks', 'redMages', 'summoners', 'blackMages', 'bards', 'machinists'])
    .exec()
    .then(arrayOfTeams => {
      console.log(arrayOfTeams);
      res.json(arrayOfTeams.map(
          (team) => team.apiRepr()
        )
      );
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  Raid
    .findById(req.params.id)
    .populate(['leader', 'applicants', 'paladins', 'warriors', 'darkKnights', 'whiteMages', 'scholars', 'astrologians', 'ninjas', 'dragoons', 'samurais', 'monks', 'redMages', 'summoners', 'blackMages', 'bards', 'machinists'])
    .exec()
    .then(team => {
      res.json(team.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});



module.exports = router;
