var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var config = require('./config.js');
var User = require('../models/User.js');

var model = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title: 'psJwt',
    subTitle: 'Thanks for signing up!',
    body: 'Please verify your email address by clicking the button below'
};

exports.send = function(email) {
    var payload = {
        sub: email,

    };

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    /*var transporter = nodemailer.createTransport(smtpTransport({
       host: 'localhost.com',
       secure: false,
        port:25,
        auth: {
           user: 'misha@localhost.com',
            pass: config.SMTP_PASS
        }
    }));*/

    var mailOptions = {
        from: 'Accounts <accounts@localhost.com>',
        to: email,
        subject: 'psJWT Account Verification',
        html: getHtml(token)
    };


   var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'strmisha.s@gmail.com',
            pass: 'Afyfngbyrakjql112'
        }
    }));

    var mailOptions = {
        from: 'Accounts <accounts@localhost.com>',
        to: email,
        subject: 'psJWT Account Verification',
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


exports.handler = function (req, res) {
    var token = req.query.token;
    var segments = token.split('.');
    console.log(segments);

    var payload = jwt.decode(token, config.EMAIL_SECRET);
    var email = payload.sub;

   if (!email) return handleError(res);

   User.findOne({email: email}, function(err, foundUser){
       if(err) return res.status(500);

       if(!foundUser) return handleError(res);

       if(!user.active)
           user.active = true;

       user.save(function(err){
           if(err) return res.status(500);

           return res.redirect(config.APP_URL);
       });
   });
}

function getHtml(token) {
    var path = './views/emailVerification.html';
    html = fs.readFileSync(path, encoding = 'utf8');

    var template = _.template(html);
    model.verifyUrl += token;

    return template(model);
}

function handleError(res) {
    return res.status(401).send({
        message: 'Auhentication failed, unable to verify email'
    })
}
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
