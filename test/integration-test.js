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
  seedData.push(  {
    username: 'testuser',
    password: '$2a$10$4W/.zCc1XG/X2ZEYYd.JeORx5J1JmLq/OnrJDGziP/Vxow57p93hq',
    email: faker.internet.email(),
    discord: faker.internet.userName(),
    playerName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName()
    },
    playerClass: [{className: 'Red Mage', level: 60}, {className: 'Ninja', level: 60}, {className: 'Samurai', level: 60}],
  });
  for (let i=1; i<=10; i++) {
    seedData.push(  {
      username: faker.internet.userName(),
      password: '$2a$10$4W/.zCc1XG/X2ZEYYd.JeORx5J1JmLq/OnrJDGziP/Vxow57p93hq',
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

  describe('Login URL', function() {
    it('should respond with a status of 200 and HTML', function() {
      return chai.request(app)
        .get('/')
        .then(function(result) {
          result.should.have.status(200);
          result.should.be.html;
        });
    });
  });

  //Test authentication endpoint
  describe('authentication router', function() {
    it('should sign in user and return user account', function() {
      let res;
      let agent = chai.request.agent(app);
      return agent
            .get('/auth/login')
            .auth('testuser', 'test-password')
            .then(res => {
              res.should.have.status(200);
              res.body.user.username.should.equal('testuser');
              res.body.user.should.include.keys(
                'username','email', 'playerName', 'playerClass'
              );
            });
    });

    it('should return user that is signed in', function() {
      let agent = chai.request.agent(app);
      return agent
				.get('/auth/login') // first have to log in
				.auth('testuser', 'test-password')
        .then(res => {
          return agent.get('/auth/me')
          .then(result => {
            result.should.have.status(200);
            result.body.user.username.should.equal('testuser');
            result.body.user.should.include.keys(
              'username','email', 'playerName', 'playerClass'
            );
          });
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
      let agent = chai.request.agent(app);
      return agent
       .get('/auth/login')
       .auth('testuser', 'test-password')
       .then(() => {
         return User
           .findOne()
           .exec();
       })
         .then(user => {
           testUser = user;
           return Raid.findOne()
             .exec();
         })
         .then(raid => {
           testRaid = raid;
           return agent
             .put(`/auth/user/${raid._id}/${testUser._id}`);
         })
         .then(res => {
           res.should.have.status(200);
           res.should.be.json;
           res.body.should.be.a('object');
           res.body.team.should.equal(testRaid._id.toString());
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
      let agent = chai.request.agent(app);

      return agent.get('/auth/login')
       .auth('testuser', 'test-password')
       .then(() => {
         return Raid.findOne()
        .exec();
       })
        .then(raid => {
          applicant = raid.jobs.dragoons[0];
          return agent
            .put(`/auth/raid/${raid.id}/${applicant}`);
        })
        .then(res => {
          let check = false;
          res.body.applicants.forEach(player => {
            if(player._id === applicant.toString()) {
              check = true;
            }
          });
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          check.should.be.true;
        });
    });

    // it('should update a raid team with given data', function() {
    //   const updateData = {
    //     name: 'Test name',
    //     jobs: {
    //       darkKnights: ''
    //     },
    //     applying: {
    //       player: ''
    //     }
    //   };
  //
  //     return Raid.findOne()
  //       .exec()
  //       .then(raid => {
  //         testRaid = raid;
  //         updateData.id = raid.id;
  //         updateData.jobs.darkKnights = raid.applicants[0];
  //         updateData.applicants = raid.applicants.splice(0,1);
  //         updateData.applying.player = raid.applicants[0];
  //         return chai.request(app)
  //           .put(`/raid/${raid.id}`)
  //           .send(updateData);
  //       })
  //       .then(res => {
  //         let classTest = false;
  //         res.should.have.status(201);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.name.should.equal(updateData.name);
  //         res.body.applicants.forEach((applicant, index) => {
  //           applicant._id.should.equal(updateData.applicants[index].toString());
  //         });
  //         res.body.members.tanks.forEach(tank => {
  //           if(tank.id === updateData.jobs.darkKnights.toString() && tank.class === 'Dark Knight') {
  //
  //             classTest = true;
  //           }
  //         });
  //         classTest.should.be.true;
  //
  //         return Raid.findById(res.body.id).exec();
  //       })
  //       .then(raid => {
  //         raid.name.should.equal(updateData.name);
  //         raid.applicants.forEach((applicant, index) => {
  //           applicant.toString().should.be.equal(updateData.applicants[index].toString());
  //         });
  //         raid.jobs.paladins.forEach((paladin, index) => {
  //           paladin.toString().should.be.equal(updateData.jobs.darkKnights.toString());
  //         });
  //       });
  //
  //   });
  // });


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
  });
});
