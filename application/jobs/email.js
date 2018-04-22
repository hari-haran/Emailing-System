
const userModel = require('../models/user');
const date = require('date.js');
const emailListModel = require('../models/emailList')
const emailModule = require('../../modules/emailmodule/index');
var statusEnum = require('../enum/statusEnum');

module.exports = { 
  sendNotification : function(userRecord){
    return new Promise((resolve, reject) => {
      var promise = null;
      if(userRecord.status.type){
        switch(userRecord.status.type){
          case statusEnum.ACTIVE_STATUS:
            //send active email
            promise = emailModule.sendActiveEmail(userRecord.email, {...userRecord._doc});
    
          break;
          case statusEnum.NOT_RESPONSIVE_STATUS:
            if(new Date(userRecord.lastEmailed).getTime() < date('3 days ago').getTime()){ 
                promise = emailModule.sendNotResponsiveEmail(userRecord.email, {...userRecord._doc});
            }
          break;
    
          case statusEnum.INACTIVE_STATUS:
          break; 
        }

        if(promise){ 
          //update Last Emailed Stamp
          promise.then(data => {
            
            userRecord.updateLastEmailed();
            //Add new Email record as well!
            emailListModel.create({emailType : userRecord.status.type, user : userRecord.id, sentDate : new Date(), status : true});

          }, err => {

            emailListModel.create({emailType : userRecord.status.type, user : userRecord.id, sentDate : new Date(), status : false, err : err});
          
          });
          resolve();
        }
        else{
          reject();
        }
      } 
      
    });  
  } 
}