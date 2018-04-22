var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./libs/mongo_connection');
var glob = require( 'glob' );

mongoose.init(); 

var app = express();

 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Include all the modules 
 */

glob.sync( './modules/**/router.js' ).forEach( function( file ) {
  require( path.resolve( file ) )(app);
});

require('./worker');

module.exports = app;
