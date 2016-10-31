var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var testClient = redis.createClient();

testClient.select('profWebsiteTest'.length);
testClient.flushall();

describe('Request to root path', function() {
  it('Returns HTML format', function(done) {
    request(app)
      .get('/')
      .expect('Content-type', /html/, done);
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
  after(function() {
    testClient.flushall();
  });

  it('Returns a status code of 201', function(done) {
      request(app)
        .post('/projects')
        .type('JSON')
        .send('{"title": "Vagabond Knight", "description": "A Dragon Slaying Riches Taking Knight"}')
        .expect(201, done);
  });

  it('Inserts a second project', function(done) {
      request(app)
        .post('/projects')
        .type('JSON')
        .send('{"title": "Bike Builder", "description": "Mix match and create your own bike"}')
        .expect(201, done);
  });
});

describe('Show project info', function() {
  before(function() {
    var testObj = {
      "title": "Vagabond Knight",
      "description": "A Dragon Slaying Riches Taking Knight"
    }
    testClient.lpush('projects', JSON.stringify(testObj));
  });

  after(function() {
    testClient.flushall();
  });

  it('Returns a status code of 200', function(done) {
    request(app)
      .get('/projects/Vagabond Knight')
      .expect(200, done);
  });
});

describe('Deleting projects', function() {
  before(function() {
    var testObj = {
      "title": "Vagabond Knight",
      "description": "A Dragon Slaying Riches Taking Knight"
    }
    testClient.lpush('projects', JSON.stringify(testObj));
  });

  // after(function() {
  //   testClient.flushall();
  // });

  it('Returns a 204 status code', function(done) {
    request(app)
      .delete('/projects/Vagabond Knight')
      .expect(204, done);
  });
});
