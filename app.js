var express = require('express');
var app = express();

app.use(express.static('public'));

var projects = require('./routes/projects');
var tags = require('./routes/tags');
var email = require('./routes/email');
app.use('/projects', projects);
app.use('/tags', tags);
app.use('/email', email);

module.exports = app;
