var jwt = require('jwt-simple');

module.exports = function (request, response, next) {
  if(!request.headers || !request.headers.authorization) {
    return response.status(401).send({message: 'Authentication failed'});
  }
  var token = request.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, "sh...");

  if(!payload.sub) {
    return response.status(401).send({message: 'Authentication failed'});
  }

  if(!request.headers.authorization) {
    return response.status(401).send(            {
      message: 'Yo are not authorized'
    });
  }

  next();


}
