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

raidSchema.methods.apiRepr = function() {
  const tanks = [];
  const healers = [];
  const dps = [];

  if(!this.paladin.isEmpty()){
    this.paladin.forEach(function(user) {
      tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'paladin'
      });
    });
  }
  if(!this.warrior.isEmpty()){
    this.warrior.forEach(function(user) {
      tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'warrior'
      });
    });
  }
  if(!this.darkKnight.isEmpty()){
    this.darkKnight.forEach(function(user) {
      tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'darkKnight'
      });
    });
  }
  if(!this.whiteMagescholar.isEmpty()){
    this.whiteMagescholar.forEach(function(user) {
      healers.push({
        id: user._id,
        playerName: user.playerName,
        class: 'whiteMage'
      });
    });
  }
  if(!this.scholar.isEmpty()){
    this.scholar.forEach(function(user) {
      healers.push({
        id: user._id,
        playerName: user.playerName,
        class: 'scholar'
      });
    });
  }
  if(!this.astrologian.isEmpty()){
    this.astrologian.forEach(function(user) {
      healers.push({
        id: user._id,
        playerName: user.playerName,
        class: 'astrologian'
      });
    });
  }
  if(!this.dragoon.isEmpty()){
    this.dragoon.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'dragoon'
      });
    });
  }
  if(!this.monk.isEmpty()){
    this.monk.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'monk'
      });
    });
  }
  if(!this.ninja.isEmpty()){
    this.ninja.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'ninja'
      });
    });
  }
  if(!this.samurai.isEmpty()){
    this.samurai.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'samurai'
      });
    });
  }
  if(!this.redMage.isEmpty()){
    this.redMage.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'redMage'
      });
    });
  }
  if(!this.summoner.isEmpty()){
    this.summoner.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'summoner'
      });
    });
  }
  if(!this.blackMage.isEmpty()){
    this.blackMage.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'blackMage'
      });
    });
  }
  if(!this.machinistbard.isEmpty()){
    this.bard.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'bard'
      });
    });
  }
  if(!this.machinist.isEmpty()){
    this.machinist.forEach(function(user) {
      dps.push({
        id: user._id,
        playerName: user.playerName,
        class: 'machinist'
      });
    });
  }

  return {
    name: this.name,
    leader: this.leader,
    time: this.time,
    applicants: this.applicants,
    members: {
      tanks: tanks,
      healers: healers,
      dps: dps
    }
  };
};

userSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    discord: this.discord,
    playerName: this.playerName,
    playerClass: this.playerClass,
    team: this.team
  };
};

const User = mongoose.model('User', userSchema);
const Raid = mongoose.model('Raid', raidSchema);

module.exports = {User, Raid};
