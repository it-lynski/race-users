Feature: Authenticate user
  In order to give a user access to a resource
  As another microservice
  I want to be able to authenticate the user

Scenario: Authenticate existing user
  Given the user 'user123' exist
  And the password is 'secret'
  When presented with userid 'user123'
  And presented with the password 'secret'
  Then a JSON web token should be returned
