var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var usersSchema = new mongoose.Schema({
  username: String,
  password: String
});

usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

usersSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    })
    .then(function() {
      next();
    });
});

var User = db.model('user', usersSchema);

module.exports = User;
