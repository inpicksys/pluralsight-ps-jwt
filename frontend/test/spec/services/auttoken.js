'use strict';

describe('Service: autToken', function () {

  // load the service's module
  beforeEach(module('psJwtApp'));

  // instantiate service
  var autToken;
  beforeEach(inject(function (_autToken_) {
    autToken = _autToken_;
  }));

  it('should do something', function () {
    expect(!!autToken).toBe(true);
  });

});
