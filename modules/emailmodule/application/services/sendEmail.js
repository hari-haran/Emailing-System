const NodeMailer = require("nodemailer");
const Email = require('email-templates');
const path = require('path');
 
var smtpTransport = NodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: '#########3'
    }
  }); 

const FROM = "hello@yourdomain.com";


const emailTransporter = new Email({
    message: {
      from: FROM
    },
    //send: true,
    transport: smtpTransport, 
    views: {
    root: path.resolve(__dirname, '../templates'),
      options: {
        extension: 'ejs' // <---- HERE
      }
    }
});
 
exports.sendActiveEmail = function (email, bodyLocals = {}, from = FROM) {

    return emailTransporter
    .send({
        template: 'activeUser',
        message: {
            to: email,
            subject: 'Active user',
            from : from
        },
        locals: bodyLocals
    }); 
};

exports.sendNotResponsiveEmail = function (email, bodyLocals = {}, from = FROM) {

    return emailTransporter
    .send({
        template: 'notResponsiveUser',
        message: {
            to: email,
            subject: 'Non Active User',
            from : from
        },
        locals: bodyLocals
    }); 
};

/*exports.sendInactiveEmail = function (email, bodyLocals = {}, from = FROM) {

    return emailTransporter
    .send({
        template: 'resetPassword',
        message: {
            to: email,
            subject: 'Password Reset',
            from : from
        },
        locals: bodyLocals
    }); 
};*/



