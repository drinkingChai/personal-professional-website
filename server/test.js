var request = require('supertest');
var app = require('./app');

describe('Request to root path', function() {
  it('Returns a status code of 200', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
