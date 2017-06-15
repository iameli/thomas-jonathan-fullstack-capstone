'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatClassString = string => {
  let tmpString = string.charAt(0).toUpperCase() + string.slice(1);

  return tmpString.slice(0,-1).split(/(?=[A-Z])/).join(' ');
};

const raidSchema = mongoose.Schema({
  name: {type: String, required: true},
  leader: {type: Schema.Types.ObjectId, ref: 'User'},
  time: {type: Date, default: Date.now},
  applicants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  jobs: {
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
  }
});

raidSchema.methods.apiRepr = function() {
  const tanks = [];
  const healers = [];
  const dps = [];

  const jobsArray = Object.keys(this.jobs.toObject());
  jobsArray.forEach(job => {
    if(this.jobs[job].length !== 0) {
      this.jobs[job].forEach(player => {
        switch(job.toString()) {
        case 'warriors':
        case 'paladins':
        case 'darkKnights':
          tanks.push({
            id: player.id,
            playerName: player.playerName,
            class: formatClassString(job.toString())
          });
          break;
        case 'scholars':
        case 'whiteMages':
        case 'astrologians':
          healers.push({
            id: player.id,
            playerName: player.playerName,
            class: formatClassString(job.toString())
          });
          break;
        default:
          dps.push({
            id: player.id,
            playerName: player.playerName,
            class: formatClassString(job.toString())
          });
        }
      });
    }
  });

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

const Raid = mongoose.model('Raid', raidSchema);

module.exports = {Raid};
