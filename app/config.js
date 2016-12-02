var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

var connection = mongoose.createConnection('mongodb://localhost:27017/shortly-deploy');

module.exports = connection;