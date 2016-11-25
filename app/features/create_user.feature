Feature: User administration
  In order to administrate users
  As a user with admin rights
  I want to be able to add, change and remove users

Scenario: Create user
  Given the user 'user123' does not exist
  When presented with userid 'user123'
  And presented with the password 'secret'
  Then the user with userid 'user123'
  And password set to 'secret' should be created
