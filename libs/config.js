 
var path = require('path');

var env = process.env.NODE_ENV || 'development'

var configFile;

switch(env) {
  case 'development':
    configFile = 'development';
    break;

  case 'test':
    configFile = 'test';
    break;

  case 'production':
    configFile = 'production';
    break;

  default:
  configFile = 'development';  
}

//set default as of now

configFile = 'default';

module.exports = require(path.join(__dirname + '/../config', configFile + '.json'));