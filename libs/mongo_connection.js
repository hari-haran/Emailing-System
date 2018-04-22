var mongoose = require('mongoose');
var config = require('./config.js');
var log = require('./log')(module);

module.exports = {
  db: null,
  init: function() {
    log.info('create connection');

    var connectionString = "mongodb://";

    if (config.mongodb.username) {
      connectionString += config.mongodb.username + ':' + config.mongodb.password + '@';
    }

    connectionString += config.mongodb.hosts + "/" + config.mongodb.database;

    mongoose.connect(connectionString);
    var db = mongoose.connection;
    this.db = db;

    db.on('error', function(err){
      log.error('Connection error:', err.message);
    });

    db.once('open', function(){
      log.info("Connected to DB!");
    });
  }
};