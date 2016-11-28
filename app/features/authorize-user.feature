Feature: Authenticate user
  In order to give a user access to a protected resource
  As another service
  I want to be able to authenticate the user and use the jwt
  to get access to protected resources

Scenario: Authenticate existing user returns valid jwt
  Given the user 'user123' exist
  And the password is 'secret'
  When presented with userid 'user123'
  And presented with the password 'secret'
  Then a JSON web token should be returned

  Scenario: Return protected resource when request has valid jwt

  Scenario: Redirect to /authorize when jwt has expired
