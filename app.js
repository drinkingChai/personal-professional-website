var express = require('express');
var app = require('./server/app');

app.use(express.static('app/public'));

module.exports = app;
