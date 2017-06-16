'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Raid} = require('../models/raid-model');

mongoose.Promise = global.Promise;
router.use(bodyParser.json());

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

// router.put('/:id', (req,res) => {
//   const updated = {};
//   const updatedJobs = {};
//   const updatedApplicants = {};
//   let updateableData = ['applicants','name', 'time', 'leader'];
//   if(req.body.jobs) {
//     updateableData = updateableData.concat(Object.keys(req.body.jobs));
//   }
//   if(req.body.applying) {
//     updateableData = updateableData.concat(Object.keys(req.body.applying));
//   }
//
//   updateableData.forEach(field => {
//     if ( field in req.body) {
//       updated[field] = req.body[field];
//     }else if(field in req.body.jobs) {
//       updatedJobs[`jobs.${field}`] = req.body.jobs[field];
//     }else if(field in req.body.applying) {
//       updatedJobs['applicants'] = req.body.applying[field];
//     }
//   });
//   Raid
//    .findByIdAndUpdate(req.params.id, {$set: updated, $push: updatedJobs}, {new: true})
//    .populate('leader applicants jobs.paladins jobs.warriors jobs.darkKnights jobs.whiteMages jobs.scholars jobs.astrologians jobs.ninjas jobs.dragoons jobs.samurais jobs.monks jobs.redMages jobs.summoners jobs.blackMages jobs.bards jobs.machinists')
//    .exec()
//    .then(raid => {
//      res.status(201).json(raid.apiRepr());
//    })
//    .catch(err => res.status(500).json({message: 'Something went wrong'}));
// });



module.exports = router;
