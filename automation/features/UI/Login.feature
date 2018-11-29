@login
Feature: Login

  Background:
    When I enter the localhost url

  @login1
  Scenario: Login with existing credentials
    When I enter "a@a.com" as email and "123" as password
    And I click "Login" button
    And I wait for "5" seconds
    Then I should be redirected to game page and see 4 doors

  @login2
  Scenario: Login with non existing credentials
    When I enter "dontexist@dontexist.com" as email and "dontexist" as password
    And I click "Login" button
    And I wait for "5" seconds
    Then I should stay in login page

  @login3
  Scenario: Login without fields filled
    When I click "Login" button
    And I wait for "5" seconds
    Then I should stay in login page

