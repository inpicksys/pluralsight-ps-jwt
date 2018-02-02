var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var jwt = require('./services/jwt.js') - our own service
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('./services/localStrategy.js');
//var GoogleStrategy = require('passport-google');
var googleAuth = require('./services/googleAuth.js');
var facebookAuth = require('./services/facebookAuth.js');
var createSendToken = require('./services/jwt.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,DELETE');
    res.header('Access-Control-Allow-HEADERS', 'Content-Type, Authorization');

    next();
});


passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post ('/register', passport.authenticate('local-register'), function(request, response){
    emailVerification.send(request.user.email);
    createSendToken(request.user, response);
});

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login',  passport.authenticate('local-login'), function(request, response){
  createSendToken(request.user, response);
});

app.post('/auth/facebook', facebookAuth);


app.get('/jobs', jobs);

app.post('/auth/google', googleAuth);

var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect('mongodb://localhost/psjwt', options ); // deprecated
//mongoose.useMongoClient('mongodb://localhost/psjwt'); // deprecated

var server = app.listen(3000, function(){
    console.log('api listening on ', server.address().port);
})