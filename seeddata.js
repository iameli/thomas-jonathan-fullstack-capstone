'use strict';

const { User, Raid } = require('./models');
const mongoose = require('mongoose');
const {DATABASE_URL} = require('./config');
const faker = require('faker');

// array of objects mapped to our Schema
const usersToCreate = [
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'paladin', level: 60}, {className: 'monk', level: 60}, {className: 'dragoon', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'dragoon', level: 60}, {className: 'redMage', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'dragoon', level: 60}, {className: 'redMage', level: 60}, {className: 'bard', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'dragoon', level: 60}, {className: 'redMage', level: 60}, {className: 'bard', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'scholar', level: 60}, {className: 'darkKnight', level: 60}, {className: 'bard', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'dragoon', level: 60}, {className: 'ninja', level: 60}, {className: 'warrior', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'dragoon', level: 60}, {className: 'ninja', level: 60}, {className: 'warrior', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'whiteMage', level: 60}, {className: 'darkKnight', level: 60}, {className: 'warrior', level: 60}],
  },
  {
    username: faker.internet.userName(),
    password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
    email: faker.internet.email(),
    discord: 'screenname#1234',
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'blackMage', level: 60}, {className: 'monk', level: 60}, {className: 'warrior', level: 60}],
  }
];

// mongoose.connect(DATABASE_URL, err => {
//   if (err) {
//     console.error(err);
//   }
//   User
//     .insertMany(usersToCreate)
//     .then(response => {
//       console.log(response);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

const teamsToCreate = [
  {
    name: faker.company.companyName(),
    leader: '59403bcd729a5924c42ce2e4',
    applicants: [
      '59403bcd729a5924c42ce2eb', '59403bcd729a5924c42ce2ef'
    ],
    darkKnight: ['59403bcd729a5924c42ce2f3'],
    warrior: ['59403bcd729a5924c42ce2f7'],
    whiteMage: ['59403bcd729a5924c42ce2ff'],
    ninja: ['59403bcd729a5924c42ce2fb'],
    dragoon: ['59403bcd729a5924c42ce2e4','59403bcd729a5924c42ce2e8'],
    monk: ['59403bcd729a5924c42ce303']
  }
];

mongoose.connect(DATABASE_URL, err => {
  if (err) {
    console.error(err);
  }
  Raid
    .insertMany(teamsToCreate)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
});
