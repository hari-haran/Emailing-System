var schedule = require('node-schedule');
var emailJob = require('./application/jobs/email');
var userJob = require('./application/jobs/user');
var userModel = require('./application/models/user')

var worker = function(){
    userModel.find({}, function(err, users){
        if(err){
            return false;
        }

        if(users){
            users.forEach(user => {
                userJob.updateUserStatus(user).then(()=>{
            
                    emailJob.sendNotification(user).then(() => {
        
                    })
                });
            }) 
        } 
    }) 
}

 

var j = schedule.scheduleJob({hour : 23, minute : 59}, function(){
    console.log('Job is running')
    worker();
});

//comment this, after testing.
worker();
 


module.exports = worker;