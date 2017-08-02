'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

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

userSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
};

const User = mongoose.model('User', userSchema);

module.exports = {User};
