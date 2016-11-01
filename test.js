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
  it('Returns a 200 status code', function(done) {
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
});

describe('Show project info', function() {
  var code;

  beforeEach(function(done) {
    setTimeout(function() {
      code = 200;
      done();
    }, 50);
  });

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
      .expect(code, done);
  });
});

describe('Deleting projects', function() {
  var code;

  beforeEach(function(done) {
    setTimeout(function() {
      code = 204;
      done();
    }, 50);
  });

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

  it('Returns a 204 status code', function(done) {
    request(app)
      .delete('/projects/Vagabond Knight')
      .expect(code, done);
  });
});

describe('Updating projects', function() {
  var code;

  beforeEach(function(done) {
    setTimeout(function() {
      code = 201;
      done();
    }, 50);
  });

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

  it('Returns a 201 satus code', function(done) {
    request(app)
    .put('/projects/Vagabond Knight')
    .type('JSON')
    .send('{"title": "Vagabond Knight", "description": "Turned over a new leaf"}')
    .expect(code, done);
  });
});
