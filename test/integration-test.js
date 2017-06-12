'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');

chai.should();
chai.use(chaiHttp);

describe('MVP', () => {
  // before(() => runServer());
  //
  // after(() => closeServer());

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
});
