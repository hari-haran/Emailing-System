var emailListModel = require('../../../../application/models/emailList');
var helpers = require( "../include/helpers" );
var _ = require( "lodash" ); 
 

/**
 * @brief Displays a list of emailList.
 */
module.exports.index = function( request, response ) {
	emailListModel.find( {} ).populate('user')
	.exec( function( errors, emailList ) {
		return response.render( "dashboard/emailList/index", {
			emailList : emailList,
			success : request.flash( "success" )
		} );
	} );
};


