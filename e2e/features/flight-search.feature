Feature: Search Flights

  As a business traveller
  I want to search for available flights between two airports on a given date
  So that I can assess whether a flight is viable based on cost and timing

  Background:
    Given I am on the flight search screen

  Scenario: Successfully search for flights between two airports
    Given I enter "CMH" as origin
    And I enter "JFK" as destination
    And I enter "2026-07-01" as the departure date
    When I tap Search
    Then I should see a list of available flights sorted by price
    And each flight should display flight number, airline, departure time,
    arrival time, total duration, and price

  Scenario: Search returns no results for the given route and date
    Given I enter "CMH" as origin
    And I enter "DAY" as destination
    And I enter "2026-07-01" as the departure date
    When I tap Search
    Then I should see a message indicating no flights were found
    And I should be prompted to try a different date or route

  Scenario: Search is submitted with missing required fields
    Given I have not entered an origin, destination, or departure date
    When I tap Search
    Then I should see a validation message for each missing required field
    And the search should not be submitted