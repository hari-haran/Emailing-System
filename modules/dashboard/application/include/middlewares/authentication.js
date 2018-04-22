var passport = require( "passport" );
var LocalStrategy = require( "passport-local" ).Strategy;

var User = require('../../../../../application/models/user');
var _ = require( "lodash" ); 

passport.use( new LocalStrategy(
	function( username, password, done ) {
		User.findOne( { username : username } )
		.exec( function( error, user ) {
			if ( _.isEmpty( error ) ) {
				if ( !user ) {
					return done( null, false );
				}

				if ( !user.checkPassword( password ) ) {
					return done( null, false );
				}
					
				
				return done( null, user );
			}

			return done( null, false );
		} );
	}
) );

passport.serializeUser( function( user, done ) {
	done( null, user.id );
} );

passport.deserializeUser( function( id, done ) {
	User.findById( id, function( error, user ) {
		done( error, user );
	} );
} );

/**
 * @brief Checks whether our user is logged in.
 */
var ensure_athenticated = function( request, response, next ) {
	if (request.url === '/dashboard/login') return next();

	if ( request.isAuthenticated() ) {
		return next();
	}

	return response.redirect( "/dashboard/login" );
};
 
var whitelist = function(request, response, next){
	return next();
}
 
module.exports = function( wildcard, application ) {
	application.use( passport.initialize() );
	application.use( passport.session() );

	var passport_options = {
		successRedirect : "/dashboard/",
		failureRedirect : "/dashboard/login"
	};

	application.all( wildcard, ensure_athenticated );
 
	passport_options.failureFlash = "Incorrect login details";
	application.post( "/dashboard/login", passport.authenticate( "local", passport_options ) );
};
