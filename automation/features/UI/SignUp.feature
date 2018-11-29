@sign-up
Feature: SignUp

  Background:
    When I enter the localhost url
    And I click "Register" button

  @sign-up1
  Scenario: Register new random user with all fields filled
    When I fill all sign up fields with random value and same password
    And I click "Sign Up" button
    And I wait for "5" seconds
    Then I should be redirected to login page

  @sign-up2
  Scenario: Register new user without without all fields filled
    When I just fill username in sign up form
    And I click "Sign Up" button
    And I wait for "5" seconds
    Then I should remain in sign up page

  @sign-up3
  Scenario:  Register new user with different passwords
    When I fill all sign up fields with random value and different password
    And I click "Sign Up" button
    And I wait for "5" seconds
    Then I should remain in sign up page
