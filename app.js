var express = require('express');
var app = express();

app.use(express.static('public'));

var projects = require('./routes/projects');
var tags = require('./routes/tags');
app.use('/projects', projects);
app.use('/tags', tags);

module.exports = app;
