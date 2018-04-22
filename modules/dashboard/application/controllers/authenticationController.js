module.exports.getLoginRoute = function( request, response ) {
    return response.render( "general/login", {} );
};

/**
 * @brief Logs out current user and takes back to login page.
 */
module.exports.getLogoutRoute = function( request, response ) {
    request.logout();
    return response.redirect( "/dashboard/login" );
};