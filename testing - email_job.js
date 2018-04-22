
 
var emailJobs = require('./application/jobs/email');
var date = require('date.js');
var statusEnum = require('./application/enum/statusEnum');

var default_functions = {
    updateLastEmailed : function(){

    }
}

var user1 = {
    firstName : "HariHaran",
    "status" : {type  : statusEnum.ACTIVE_STATUS},
    "lastLogin": date('5 days ago'),
    email : 'haran.hari60@gmail.com',
    lastEmailed : date('4 days ago') , 
} 
user1._doc = {...user1};
user1.updateLastEmailed = default_functions.updateLastEmailed;

var user2 = {
    firstName : "HariHaran",
    "status" : {type  : statusEnum.NOT_RESPONSIVE_STATUS},
    "lastLogin": date('5 days ago'),
    email : 'haran.hari60@gmail.com',
    lastEmailed : date('2 days ago') , 
} 
user2._doc = {...user2, ...default_functions};
user2.updateLastEmailed = default_functions.updateLastEmailed;

emailJobs.sendNotification(user1).then(data => { 
    console.log('Testing Case 1 : Email has been sent, Duration : Daily, Status - '+user1.status.type)
}, err => {
    console.log('Error :' +err);
});

 
emailJobs.sendNotification(user2).then(data => { 
    console.log('Testing Case 2 : Email has been sent, Duration : once every three days, Status - '+user2.status.type)
}, err => {
    console.log('Testing Case 2 : Email couldnt send, Status - '+user2.status.type)
});

 