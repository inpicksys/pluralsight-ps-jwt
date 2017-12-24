var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var jwt = require('./services/jwt.js') - our own service
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var GoogleStrategy = require('passport-google');
var requestLib = require('request');
var facebookAuth = require('./services/facebookAuth.js');
var createSendToken = require('./services/jwt.js');

var User = require('./models/User.js');

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

var strategyOptions = {
    usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done){

    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function(err, user){
        if(err) return done(err);

        if(!user) {
            return done(null, false, {message: 'Wrong email/password'});
        }

        user.comparePasswords(password, function(err, isMatch){
            if(err) return done(err);

            if (!isMatch) {
                return done(null, false, {message: 'Wrong email/password'});
            }

            return done(null, user);
        });
    });
});

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){
    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function(err, user) {
        if (err) return done(err);

        if (user) {
            return done(null, false, {
                    message: 'Email already exists'
                });
        }


        var newUser = new User({
            email: email,
            password: password
        });


        newUser.save(function (err) {
            done(null, newUser);
        });
    });
});

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post ('/register', passport.authenticate('local-register'), function(request, response){
    createSendToken(request.user, response);
});

app.post('/login',  passport.authenticate('local-login'), function(request, response){
  createSendToken(request.user, response);
});

app.post('/auth/facebook', facebookAuth);


var jobs = [
    'Cook',
    'Super Hero',
    'Unicorn Wisperer',
    'Toast Inspector'
];

app.get('/jobs', function(request, response){

    if(!request.headers.authorization) {
        return response.status(401).send(            {
                message: 'Yo are not authorized'
            });
    }

    var token = request.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "sh...");

    if(!payload.sub) {
        response.status(401).send({message: 'Authentication failed'});
    }

    response.json(jobs);
});

app.post('/auth/google', function(req, res){

    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: '1CzAR9FiOzp3S9ormqhkNRih' // not recommended for production, just for teaching purposes
    };

    //console.log(request.body.code );
    requestLib.post(url, {
            json: true,
            form: params
        },
        function(err, response, token){
            console.log(token);
            var accessToken = token.access_token;
            var headers = {
                Authorization: 'Bearer ' + accessToken
            }

           requestLib.get({url: apiUrl, headers: headers, json: true}, function(err, response, profile){
                User.findOne({googleId: profile.sub}, function(err, foundUser ) {
                    if(foundUser) return createSendToken(foundUser, res);

                    var newUser = new User();
                    newUser.googleId = profile.sub;
                    newUser.displayName = profile.name;
                    newUser.save(function(err){
                        if(err) return next(err);
                        createSendToken(newUser, res);
                    });
                });
           });
    });
});

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