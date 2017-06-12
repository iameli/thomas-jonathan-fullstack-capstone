'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//const passport = require('passport');

//const { BasicStrategy } = require('passport-http');

const jsonParser = bodyParser.json();

const router = express.Router();

// passport.use(basicStrategy);
// router.use(passport.initialize());
// router.use(passport.authenticate('basic', {session:false}));
router.use(jsonParser);
router.use(express.static('public'));


module.exports = router;
