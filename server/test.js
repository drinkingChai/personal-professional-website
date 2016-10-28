var request = require('supertest');
var app = require('./app');

describe('Request to root path', function() {
  it('Returns a status code of 200', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('Request all projects', function() {
  it('Returns all projects', function(done) {
      request(app)
        .get('/projects')
        .expect(200, done);
  });
});

describe('Create new projects', function() {
  it('Returns a status code of 201', function(done) {
      request(app)
        .post('/projects')
        .send('name=Vagabond+Knight&description=A+Dragon+Slaying+Riches+Taking+Knight')
        .expect(201, done)
  });

  it('Inserts a second project', function(done) {
      request(app)
        .post('/projects')
        .send('name=Bike+Builder&description=Mix+match+and+create+your+own+bike')
        .expect(201, done)
  });
});
