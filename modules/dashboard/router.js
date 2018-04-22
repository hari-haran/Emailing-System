 
var express = require('express');
   
var csrf = require( "csurf" ); 

var authentication = require( "./application/include/middlewares/authentication" );
var csrf_inject = require( "./application/include/middlewares/csrfinject" );
var emailListController = require( "./application/controllers/emailListController" ); 

var authController = require( "./application/controllers/authenticationController" );
var flash = require( "connect-flash" );
var cookie_parser = require( "cookie-parser" );
var session = require( "express-session" );

var method_override = require( "method-override" );
var custom_method_override = require( "./application/include/middlewares/methodoverride" );

module.exports = function(app) { 
    
    app.use("/dashboard*", cookie_parser( "dashboard_cookie" ) );
    app.use("/dashboard*", session( {
        secret : "dashboard_cookie"
    } ) );

    app.use( "/dashboard*", flash() );

    app.use( express.static( __dirname + '/assets/') ); 
    app.set( "views", __dirname+'/application/views' );
    app.set( "view engine", "jade" );

    app.use( method_override( custom_method_override ) );
    authentication( "/dashboard*", app );


    app.use( "/dashboard*", csrf() );
    app.use("/dashboard*", csrf_inject );

    app.get( "/dashboard/login", authController.getLoginRoute );
    app.get( "/dashboard/logout", authController.getLogoutRoute );
        
    app.get( "/dashboard/", emailListController.index);
 

};

 
