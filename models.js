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
  discord: {type: String, required: false},
  playerName: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  playerClass: [{
    className: {type: String, required: false},
    level: {type: Number, required: false}
  }],
  team: {type: Schema.Types.ObjectId, ref: 'Raid'}
});

raidSchema.methods.apiRepr = function() {
  const tanks = [];
  const healers = [];
  const dps = [];

  if(this.paladin.length !== 0) {
    this.paladin.forEach(function(user) {
      // console.log('user:', user);
      return tanks.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Paladin'
      });
    });
  }
  if(this.warrior.length !== 0) {
    this.warrior.forEach(function(user) {
      return tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'Warrior'
      });
    });
  }
  if(this.darkKnight.length !== 0) {
    this.darkKnight.forEach(function(user) {
      return tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'Dark Knight'
      });
    });
  }
  if(this.whiteMage.length !== 0) {
    this.whiteMage.forEach(function(user) {
      return healers.push({
        id: user.id,
        playerName: user.playerName,
        class: 'White Mage'
      });
    });
  }
  if(this.scholar.length !== 0) {
    this.scholar.forEach(function(user) {
      return healers.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Scholar'
      });
    });
  }
  if(this.astrologian.length !== 0){
    this.astrologian.forEach(function(user) {
      return healers.push({
        id: user.id,
        playerName: user.playerName,
        class: 'astrologian'
      });
    });
  }
  if(this.dragoon.length !== 0){
    this.dragoon.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Dragoon'
      });
    });
  }
  if(this.monk.length !== 0) {
    this.monk.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Monk'
      });
    });
  }
  if(this.ninja.length !== 0) {
    this.ninja.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Ninja'
      });
    });
  }
  if(this.samurai.length !== 0) {
    this.samurai.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Samurai'
      });
    });
  }
  if(this.redMage.length !== 0) {
    this.redMage.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Red Mage'
      });
    });
  }
  if(this.summoner.length !== 0) {
    this.summoner.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Summoner'
      });
    });
  }
  if(this.blackMage.length !== 0) {
    this.blackMage.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Black Magic'
      });
    });
  }
  if(this.bard.length !== 0) {
    this.bard.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Bard'
      });
    });
  }
  if(this.machinist.length !== 0) {
    this.machinist.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Machinist'
      });
    });
  }

  return {
    id: this._id,
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
