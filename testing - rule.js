/**
 * Unit testing  -- Rules Mapping
 */

var rules = require('./application/rules/userStatusRules'); 
var date = require('date.js');
var statusEnum = require('./application/enum/statusEnum');

var user1 = {
    firstName : "HariHaran",
    "status" : {type  : statusEnum.ACTIVE_STATUS},
    "lastLogin": date('5 days ago'),
    email : 'haran.hari60@gmail.com',
    lastEmailed : date('4 days ago') , 
} 
user1._doc = {...user1};

var user2 = {
    firstName : "HariHaran",
    "status" : {type  : statusEnum.NOT_RESPONSIVE_STATUS},
    "lastLogin": date('3 days ago'),
    email : 'haran.hari60@gmail.com',
    lastEmailed : date('4 days ago') , 
} 
user2._doc = {...user2};

var user3 = {
    firstName : "HariHaran",
    "status" : {type  : statusEnum.NOT_RESPONSIVE_STATUS},
    "lastLogin": date('1 days ago'),
    email : 'haran.hari60@gmail.com',
    lastEmailed : date('4 days ago') , 
} 
user3._doc = {...user3};

rules.execute(user1 , function(result){ 
    
    if(result.result && result.newStatus){
        console.log('Testing Case 1 : This is the new Status :'+result.newStatus)
    }
    else{
        console.log(arguments);
    } 
});

rules.execute(user2 , function(result){ 
    
    if(result.result && result.newStatus){
        console.log('Testing Case 2 : This is the new Status :'+result.newStatus)
    }
    else{
        console.log(arguments);
    } 
});

rules.execute(user3 , function(result){ 
    
    if(result.result && result.newStatus){
        console.log('Testing Case 3 : This is the new Status :'+result.newStatus)
    }
    else{
        console.log(arguments);
    } 
});