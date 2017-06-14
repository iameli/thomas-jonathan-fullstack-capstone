'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');
const {Raid, User} = require('../models');
const {closeServer, runServer, app} = require('../server');

let testRaid;

chai.should();
chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedUserData() {
  console.info('seeding user data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push(  {
      username: faker.internet.userName(),
      password: '$2a$10$8ciUi0cDTg3yLvoKkYAxmOu5ihC7xnZ8TOdDSAOQ0giD0pd7l7mo2',
      email: faker.internet.email(),
      discord: faker.internet.userName(),
      playerName: {
        firstName: faker.name.firstName(),
        lastName: faker.name.firstName()
      },
      playerClass: [{className: 'paladin', level: 60}, {className: 'monk', level: 60}, {className: 'dragoon', level: 60}],
    });
  }
  // this will return a promise
  return User.insertMany(seedData);
}

function seedRaidData(data) {
  console.log('seeding raid data');
  testRaid = {
    name: faker.company.companyName(),
    leader: data[0].id,
    applicants: [
      data[1].id, data[1].id
    ],
    darkKnight: [data[3].id],
    warrior: [data[4].id],
    whiteMage: [data[5].id],
    ninja: [data[6].id],
    dragoon: [data[7].id,data[8].id],
    monk: [data[9].id]
  };

  return Raid.create(testRaid);
    // });
}

describe('MVP', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserData().then(users => {
      return seedRaidData(users);
    });
  });

  afterEach(function() {
  // tear down database so we ensure no state from this test
  // effects any coming after.
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('Root URL', function() {
    it('should respond with a status of 200 and HTML', function() {
      return chai.request(app)
        .get('/')
        .then(function(result) {
          result.should.have.status(200);
          result.should.be.html;
        })
        .catch(err => {
          console.error(err);
        });
    });
  });

  describe('User endpoint', function() {

    it('should return with an array of users', function() {
      let res;
      return chai.request(app)
       .get('/user')
       .then(function(_result) {
         res = _result;
         res.should.have.status(200);
         res.body.should.have.length.of.at.least(1);

         return User.count();
       })
       .then(count => {
         res.body.should.have.lengthOf(count);
       })
       .catch(err => {
         console.error(err);
       });
    });

    it('should return a single user when passed an id', function() {
      let user;
      let res;
      return chai.request(app)
       .get('/user')
       .then(function(_result) {
         res = _result;
         return User.findById(res.body[0].id);
       })
       .then(_user => {
         user = _user;
         return User.findById(user.id);
       })
       .then(_user => {

       })
       .catch(err => {
         console.error(err);
       });
    });
  });


  // describe('Login URL', function() {
  //   it('should respond with a status of 200 and HTML', function() {
  //     return chai.request(app)
  //     .get('/login/')
  //     .then(function(result) {
  //       result.should.have.status(200);
  //       result.should.be.html;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //   });
  // });
  //
  // describe('Login URL', function() {
  //   it('should respond with a status of 200 and HTML', function() {
  //     return chai.request(app)
  //     .get('/raid-management/')
  //     .then(function(result) {
  //       result.should.have.status(200);
  //       result.should.be.html;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //   });
  // });
  //
  // describe('Login URL', function() {
  //   it('should respond with a status of 200 and HTML', function() {
  //     return chai.request(app)
  //     .get('/user-management/')
  //     .then(function(result) {
  //       result.should.have.status(200);
  //       result.should.be.html;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //   });
  // });
});
