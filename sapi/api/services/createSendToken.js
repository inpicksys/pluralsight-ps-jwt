/*var crypto = require('crypto');

exports.encode = function(payload, secret) {
    var algorithm = 'HS256';

    var header = {
        type: 'JWT', alg: algorithm
    };

    var jwt = base64Encode(JSON.stringify(header)) +  '.' + base64Encode(JSON.stringify(payload));
    console.log();
    return jwt + '.'+ sign (jwt, secret);
};

exports.decode = function(token, secret){
    var segments = token.split('.');

    if(segments.length !== 3)
        throw new Error('Token structure incorrect');

    var header = JSON.parse(base64Decode(segments[0]));
    var payload = JSON.parse(base64Decode(segments[1]));

    var rawSignature = segments[0] + '.' + segments[1];

    if(!verify(rawSignature, secret, segments[2])) {
       throw new Error('Verification failed');
    };

    return payload;
};

function verify(raw, secret, signature){
    return signature === sign(raw, secret);
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}
function base64Encode(str) {
    return new Buffer(str).toString('base64');
}

function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}*/

var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function (user, response){
  var payload = {
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, 'sh...');

  response.status(200).send({
    user: user.toJSON(),
    token: token
  });
};
