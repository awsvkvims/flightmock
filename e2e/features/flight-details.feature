Feature: View Flight Details

  As a business traveller
  I want to view the full details of a specific flight
  So that I can make an informed decision before saving or booking

  Background:
    Given I am on the flight search screen
    And I have searched for flights from "CMH" to "JFK" on "2026-07-01"
    And I can see a list of flight results

  Scenario: View full details of a flight from results list
    When I tap on a flight in the results list
    Then I should be taken to the flight detail screen
    And I should see the following information:
      | Field            |
      | Flight number    |
      | Airline          |
      | Origin airport   |
      | Destination airport |
      | Departure time   |
      | Arrival time     |
      | Total duration   |
      | Cabin class      |
      | Price            |
      | Seats remaining  |

  Scenario: Navigate back from flight details to results list
    When I tap on a flight in the results list
    And I tap Back
    Then I should be returned to the flight results screen
    And my previous search results should still be visible

  Scenario: Low seat availability warning is displayed
    When I tap on a flight that has fewer than 5 seats remaining
    Then I should be taken to the flight detail screen
    And I should see a warning indicating limited seat availability

    