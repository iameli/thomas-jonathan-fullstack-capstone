'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Raid} = require('../models/raid-model');

mongoose.Promise = global.Promise;
router.use(bodyParser.json());

//Apply

router.put('/:id/:userId', (req, res) => {
  Raid
   .findByIdAndUpdate(req.params.id, {$push: { applicants: req.params.userId } }, {new: true})
   .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
   .exec()
   .then(raid => res.status(201).json(raid.apiRepr()))
   .catch(err => res.status(500).json({message: 'Something went wrong'}));
});
//Accept
router.post('/:teamId/:fieldName/:playerId', (req, res) => {
  //validation

  Raid
    .findByIdAndUpdate(req.params.teamId,
      { $push: { [req.params.fieldName]: req.params.playerId } },
      {new: true})
    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
    .exec()
    .then(response => res.status(200).json(response.apiRepr()));
});
//Reject
router.delete('/:teamId/:fieldName/:playerId', (req, res) => {
  //validation

  Raid
    .findByIdAndUpdate(req.params.teamId,
      { $pull: { [req.params.fieldName]: req.params.playerId } },
      {new: true})
    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
    .exec()
    .then(updatedTeam => res.status(200).json(updatedTeam.apiRepr()));
});

router.get('/', (req, res) => {
  Raid
    .find()
    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
    .exec()
    .then(arrayOfTeams => {
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
    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
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
