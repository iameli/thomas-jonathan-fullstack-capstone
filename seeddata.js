'use strict';

const { User, Raid } = require('./models');
const mongoose = require('mongoose');
const {DATABASE_URL} = require('./config');
const faker = require('faker');

// array of objects mapped to our Schema
// const usersToCreate = [
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'paladin', level: 60}, {className: 'monk', level: 60}, {className: 'dragoon', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'dragoon', level: 60}, {className: 'redMage', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'dragoon', level: 60}, {className: 'redMage', level: 60}, {className: 'bard', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'dragoon', level: 60}, {className: 'redMage', level: 60}, {className: 'bard', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'scholar', level: 60}, {className: 'darkKnight', level: 60}, {className: 'bard', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'dragoon', level: 60}, {className: 'ninja', level: 60}, {className: 'warrior', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'dragoon', level: 60}, {className: 'ninja', level: 60}, {className: 'warrior', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'whiteMage', level: 60}, {className: 'darkKnight', level: 60}, {className: 'warrior', level: 60}],
//   },
//   {
//     username: faker.internet.userName(),
//     password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
//     email: faker.internet.email(),
//     discord: 'screenname#1234',
//     playerName: {
//       firstName: faker.name.firstName(),
//       lastName: faker.name.firstName()
//     },
//     playerClass: [{className: 'blackMage', level: 60}, {className: 'monk', level: 60}, {className: 'warrior', level: 60}],
//   }
// ];

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
//
const teamsToCreate = [
  {
    name: faker.company.companyName(),
    leader: '5941dfab80909f23f7a3e167',
    applicants: [
      '5941dfab80909f23f7a3e16b', '5941dfab80909f23f7a3e16e', '5941dfab80909f23f7a3e172', '5941dfab80909f23f7a3e176', '5941dfab80909f23f7a3e17a', '5941dfab80909f23f7a3e17e', '5941dfab80909f23f7a3e182', '5941dfab80909f23f7a3e186'
    ],
    darkKnight: [],
    warrior: [],
    whiteMage: [],
    ninja: [],
    dragoon: ['5941dfab80909f23f7a3e167'],
    monk: []
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
