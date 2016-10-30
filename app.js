var express = require('express');
var app = express();

app.use(express.static('public'));

var projects = require('./routes/projects');
app.use('/projects', projects);

module.exports = app;
