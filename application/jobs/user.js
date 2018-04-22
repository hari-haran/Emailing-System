const userModel = require('../models/user');
const userRules = require('../rules/userStatusRules');
 


module.exports = { 
    updateUserStatus : function(userRecord){
        return new Promise((resolve, reject) => {
            var lastLoginStamp = new Date(userRecord.lastLogin);
            var status = userRecord.status.type;
            
            userRules.execute(userRecord, function(response){
                if(response.result && response.newStatus){
                    var newStatus = response.newStatus;
                    userRecord.updateStatus(newStatus).then(data => {
                        resolve();
                    })
                }
                else{
                    resolve();
                }
            })
             
        }); 
    }
}