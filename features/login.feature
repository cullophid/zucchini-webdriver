@home
Feature: Login

  As am user
  I want to login


  Scenario: Login
    Given I visit '/login'
    When I login
    Then I should be on the 'forecast-page'
