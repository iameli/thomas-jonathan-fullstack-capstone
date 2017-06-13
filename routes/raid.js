'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Raid} = require('../models');

mongoose.Promise = global.Promise;


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
      console.log(team.apiRepr());
      res.json(team.apiRepr());
    })
    .catch(err => {
      res.send(err);
    });
});



module.exports = router;
