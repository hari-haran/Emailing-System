 
module.exports = function( request, response, next ) {
	response.locals.csrf_token = request.csrfToken();
	next();
};
