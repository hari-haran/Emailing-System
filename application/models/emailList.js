var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = {
    emailType : String,
    user : {
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    sentDate : Date,
    status : Boolean,
    err : JSON
}

var EmailList = new Schema(schema);

module.exports = mongoose.model('Emaillist', EmailList);