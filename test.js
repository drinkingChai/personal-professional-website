var request = require('supertest');
var app = require('./app');

describe('Request to root path', function() {
  it('Returns HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-type', /html/, done);
  });
});
