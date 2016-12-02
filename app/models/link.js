var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var urlsSchema = new mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
});

urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

var Link = db.model('link', urlsSchema);

module.exports = Link;
