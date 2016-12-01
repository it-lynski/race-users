/* eslint-env node, mocha */
var chai = require('chai')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Authorize', function () {
  it('should not authorize an unknown user /authorize POST')
  it('should not authorize user with wrong password /authorize POST')
  it('should authorize an existing user with correct password /authorize POST')
})
