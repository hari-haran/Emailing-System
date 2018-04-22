var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userStatus = {
  type : {
    type : String 
  },  
  lastUpdate : {
    type : Date
  }
}

var schema = {
    firstName : String,
    lastName : String,
    username: { type: String, maxlength: 30, required: true, 
      //unique: true 
    },
    email : {
      type : String,
      required : true,
      //unique: true 
    },
    hashedPassword: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }, 
    lastLogin : Date,
    lastEmailed : Date, 
    status : userStatus, 
    created: {
      type: Date,
      default: Date.now
    },
  }

var User = new Schema(schema);

User.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('userId')
  .get(function () {
    return this.id;
  });

User.virtual('password')
  .set(function(password) { 
    //if(this.hashedPassword == "")
    //{
      this._plainPassword = password;
      this.salt = crypto.randomBytes(32).toString('base64');
      this.hashedPassword = this.encryptPassword(password);
    //} 
  })
  .get(function() { return this._plainPassword; });

 

User.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

User.methods.updateLoginStamp = function(){
  this.lastLogin = new Date();
  this.save(function(err, user) {
    console.log(err);
  });
}

User.methods.updateStatus = function(status){
  return new Promise((resolve, reject) => {
    this.status.type = status;
    this.status.lastUpdate = new Date();
    this.save(function(err, user) {
      resolve();
    });
  }); 
}

User.methods.updateLastEmailed = function(){
  this.lastEmailed = new Date();
  this.save(function(err, user) {

  });
};


module.exports = mongoose.model('User', User);