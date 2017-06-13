'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raidSchema = mongoose.Schema({
  name: {type: String, required: true},
  leader: {type: Schema.Types.ObjectId, ref: 'User'},
  time: {type: Date, default: Date.now},
  applicants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  paladin: [{type: Schema.Types.ObjectId, ref: 'User'}],
  warrior: [{type: Schema.Types.ObjectId, ref: 'User'}],
  darkKnight: [{type: Schema.Types.ObjectId, ref: 'User'}],
  whiteMage: [{type: Schema.Types.ObjectId, ref: 'User'}],
  scholar: [{type: Schema.Types.ObjectId, ref: 'User'}],
  astrologian: [{type: Schema.Types.ObjectId, ref: 'User'}],
  ninja: [{type: Schema.Types.ObjectId, ref: 'User'}],
  dragoon: [{type: Schema.Types.ObjectId, ref: 'User'}],
  samurai: [{type: Schema.Types.ObjectId, ref: 'User'}],
  monk: [{type: Schema.Types.ObjectId, ref: 'User'}],
  redMage: [{type: Schema.Types.ObjectId, ref: 'User'}],
  summoner: [{type: Schema.Types.ObjectId, ref: 'User'}],
  blackMage: [{type: Schema.Types.ObjectId, ref: 'User'}],
  bard: [{type: Schema.Types.ObjectId, ref: 'User'}],
  machinist: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  discord: {type: String, required: true},
  playerName: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: false}
  },
  playerClass: [{
    className: {type: String, required: true},
    level: {type: Number, required: true}
  }],
  team: {type: Schema.Types.ObjectId, ref: 'Raid'}
});


const User = mongoose.model('User', userSchema);
const Raid = mongoose.model('Raid', raidSchema);

module.exports = {User, Raid};
