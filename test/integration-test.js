'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');
const {Raid} = require('../models/raid-model');
const {User} = require('../models/user-model');
const {closeServer, runServer, app} = require('../server');

let testRaid;

chai.should();
chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure data from one test does not stick
// around for next one
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

//Used to push random users and a random raid team
//onto the test database.
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
      data[1].id, data[2].id
    ],
    jobs: {
      darkKnights: [data[3].id],
      warriors: [data[4].id],
      whiteMages: [data[5].id],
      ninjas: [data[6].id],
      dragoons: [data[7].id,data[8].id],
      monks: [data[9].id]
    }
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
        });
    });
  });

  //Tests for user router
  describe('User endpoint', function() {

    it('should return with an array of users', function() {
      let res;
      return chai.request(app)
       .get('/user')
       .then(function(_result) {
         res = _result;
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.have.length.of.at.least(1);

         return User.count();
       })
       .then(count => {
         res.body.should.have.lengthOf(count);
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
         return User.findById(_user.id);
       })
       .then(_user => {
         user = _user;
         user.id.should.be.equal(res.body[0].id);
       });
    });

    it('should update a user\'s\ team when accepted', function() {
      let testUser;
      let testRaid;
      return User
       .findOne()
       .exec()
       .then(user => {
         testUser = user;
         return Raid.findOne()
         .exec()
         .then(raid => {
           testRaid = raid;
           return chai.request(app)
             .put(`/user/${raid._id}/${testUser._id}`)
             .then(res => {
               res.should.have.status(201);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.team.should.equal(raid._id.toString());
             });
         });
       });
    });

    it('should create a user', function() {
      const newUser = {
        username:'true14',
        password: 'test-password' ,
        email: faker.internet.email(),
        discord: faker.internet.userName(),
        playerName: {
          firstName: 'Vynith',
          lastName: 'Utali'
        },
        playerClass: [
          {
            className: 'Paladin',
            level: 60
          },
          {
            className:'Summoner',
            level: 60
          },
          {
            className: 'Warrior',
            level: 60
          },
          {
            className: 'Dark Knight',
            level: 60
          }
        ]
      };

      return chai.request(app)
        .post('/user')
        .send(newUser)
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');

        });
    });
  });

  //Tests for raid router
  describe('Raid endpoint', function() {

    it('should return with an array of teams', function() {
      let res;
      return chai.request(app)
        .get('/raid')
        .then(function(_result) {
          res = _result;
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.length.of.at.least(1);

          return Raid.count();
        })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it('should return a single raid team when passed an id', function() {
      let raid;
      let res;
      return chai.request(app)
       .get('/raid')
        .then(function(_result) {
          res = _result;
          return Raid.findById(res.body[0].id);
        })
       .then(_raid => {
         return Raid.findById(_raid.id);
       })
         .then(_raid => {
           raid = _raid;
           raid.id.should.be.equal(res.body[0].id);
         });
    });

    it('should add a user to applicants', function() {
      let applicant = '';

      return Raid.findOne()
        .exec()
        .then(raid => {
          applicant = raid.jobs.dragoons[0];
          return chai.request(app)
            .put(`/raid/${raid.id}/${applicant}`);
        })
        .then(res => {
          let check = false;
          res.body.applicants.forEach(player => {
            if(player._id === applicant.toString()) {
              check = true;
            }
          });
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          check.should.be.true;
        });
    });
  });
});
