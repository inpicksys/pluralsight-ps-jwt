var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var jwt = require('./services/jwt.js')
var User = require('./models/User.js');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,DELETE');
    res.header('Access-Control-Allow-HEADERS', 'Content-Type, Authorization');

    next();
});


app.post ('/register', function(req, res){
    var user = req.body;
    var newUser = new User.model({
        email: user.email,
        password: user.password
    });

    var payload = {
       iss: req.hostname,
        sub:user._id
    };

    var token = jwt.encode(payload, 'sh...')
    newUser.save(function(err){
        res.status(200).send({user: newUser.toJSON(), token: token});
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