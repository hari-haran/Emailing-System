var RuleEngine = require("node-rules")
var date = require('date.js');
var statusEnum = require('../enum/statusEnum');
  
var rules = [{
    "condition": function(R) {  

        R.when(this.status.type == statusEnum.ACTIVE_STATUS && new Date(this.lastLogin).getTime() < date('4 days ago').getTime());

    },
    "consequence": function(R) {   
        this.newStatus = statusEnum.NOT_RESPONSIVE_STATUS; 
        R.stop();
    }
},
{
    "condition": function(R) { 

        R.when(this.status.type == statusEnum.NOT_RESPONSIVE_STATUS && new Date(this.lastLogin).getTime() < date('2 days ago').getTime());
        
    },
    "consequence": function(R) {  
        this.newStatus = statusEnum.INACTIVE_STATUS; 
        R.stop();
    }
},
{
    "condition": function(R) {

        R.when(this.status.type == statusEnum.NOT_RESPONSIVE_STATUS && new Date(this.lastLogin).getTime() > date('2 days ago').getTime());

        
    },
    "consequence": function(R) {  
        this.newStatus = statusEnum.ACTIVE_STATUS;  
        R.stop();
    }
},
{
    "condition": function(R) {
        R.when(true);
    },
    "consequence": function(R) {  
        this.newStatus = false;  
        this.result = false;
        R.stop();
    }
}];

module.exports =  new RuleEngine(rules);