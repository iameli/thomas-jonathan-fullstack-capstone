'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raidSchema = mongoose.Schema({
  name: {type: String, required: true},
  leader: {type: Schema.Types.ObjectId, ref: 'User'},
  time: {type: Date, default: Date.now},
  applicants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  paladins: [{type: Schema.Types.ObjectId, ref: 'User'}],
  warriors: [{type: Schema.Types.ObjectId, ref: 'User'}],
  darkKnights: [{type: Schema.Types.ObjectId, ref: 'User'}],
  whiteMages: [{type: Schema.Types.ObjectId, ref: 'User'}],
  scholars: [{type: Schema.Types.ObjectId, ref: 'User'}],
  astrologians: [{type: Schema.Types.ObjectId, ref: 'User'}],
  ninjas: [{type: Schema.Types.ObjectId, ref: 'User'}],
  dragoons: [{type: Schema.Types.ObjectId, ref: 'User'}],
  samurais: [{type: Schema.Types.ObjectId, ref: 'User'}],
  monks: [{type: Schema.Types.ObjectId, ref: 'User'}],
  redMages: [{type: Schema.Types.ObjectId, ref: 'User'}],
  summoners: [{type: Schema.Types.ObjectId, ref: 'User'}],
  blackMages: [{type: Schema.Types.ObjectId, ref: 'User'}],
  bards: [{type: Schema.Types.ObjectId, ref: 'User'}],
  machinists: [{type: Schema.Types.ObjectId, ref: 'User'}]
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

  if(this.paladins.length !== 0) {
    this.paladins.forEach(function(user) {
      // console.log('user:', user);
      return tanks.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Paladin'
      });
    });
  }
  if(this.warriors.length !== 0) {
    this.warriors.forEach(function(user) {
      return tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'Warrior'
      });
    });
  }
  if(this.darkKnights.length !== 0) {
    this.darkKnights.forEach(function(user) {
      return tanks.push({
        id: user._id,
        playerName: user.playerName,
        class: 'Dark Knight'
      });
    });
  }
  if(this.whiteMages.length !== 0) {
    this.whiteMages.forEach(function(user) {
      return healers.push({
        id: user.id,
        playerName: user.playerName,
        class: 'White Mage'
      });
    });
  }
  if(this.scholars.length !== 0) {
    this.scholars.forEach(function(user) {
      return healers.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Scholar'
      });
    });
  }
  if(this.astrologians.length !== 0){
    this.astrologians.forEach(function(user) {
      return healers.push({
        id: user.id,
        playerName: user.playerName,
        class: 'astrologian'
      });
    });
  }
  if(this.dragoons.length !== 0){
    this.dragoons.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Dragoon'
      });
    });
  }
  if(this.monks.length !== 0) {
    this.monks.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Monk'
      });
    });
  }
  if(this.ninjas.length !== 0) {
    this.ninjas.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Ninja'
      });
    });
  }
  if(this.samurais.length !== 0) {
    this.samurais.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Samurai'
      });
    });
  }
  if(this.redMages.length !== 0) {
    this.redMages.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Red Mage'
      });
    });
  }
  if(this.summoners.length !== 0) {
    this.summoners.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Summoner'
      });
    });
  }
  if(this.blackMages.length !== 0) {
    this.blackMages.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Black Magic'
      });
    });
  }
  if(this.bards.length !== 0) {
    this.bards.forEach(function(user) {
      return dps.push({
        id: user.id,
        playerName: user.playerName,
        class: 'Bard'
      });
    });
  }
  if(this.machinists.length !== 0) {
    this.machinists.forEach(function(user) {
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
