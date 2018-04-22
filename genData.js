 
var db = require('./libs/mongo_connection'); 

var User = require('./application/models/user');  
var date = require('date.js');
var statusEnum = require('./application/enum/statusEnum');
db.init();


var importCnt = 0; 

//console.log(User);
 

var adminUser = new User({  
    username: 'admin', 
    password : 'admin',
    email : 'haran.hari60@gmail.com',
    status : {
        type : statusEnum.ACTIVE_STATUS,
        lastUpdate: new Date()
    }
}).save();

 

new User({  
    firstName : 'Testing - 1',
    username: 'Testing - 1', 
    password : 'testing',
    email : 'haran.hari60@gmail.com',
    status : {
        type : statusEnum.ACTIVE_STATUS, 
    },
    lastLogin : date('1 day ago')
}).save();  

new User({  
    firstName : 'Testing - 2',
    username: 'Testing - 2', 
    password : 'testing',
    email : 'haran.hari60@gmail.com',
    status : {
        type :  statusEnum.ACTIVE_STATUS, 
    },
    lastLogin : date('4 day ago')
}).save();  

new User({  
    firstName : 'Testing - 3',
    username: 'Testing - 3', 
    password : 'testing',
    email : 'haran.hari60@gmail.com',
    status : {
        type : statusEnum.NOT_RESPONSIVE_STATUS, 
    },
    lastLogin : date('1 day ago')
}).save();  