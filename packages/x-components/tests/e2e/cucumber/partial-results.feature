Feature: Partial results component

  Scenario Outline:  1. Shows no partial results if there are enough results
    Given no special config for partial-results view
    When  "<query>" is searched
    Then  at least 4 related results are displayed
    And   no partial results are displayed

    Examples:
      | query  |
      | lego   |

  Scenario Outline: 2. Show partial results if there are not enough results
    Given no special config for partial-results view
    When  "<query>" is searched
    Then  less than 4 related results are displayed
    And   partial results are displayed

    Examples:
      | query             |
      | lego verde y azul |

  Scenario Outline: 3. Click on partial query button launches new search
    Given no special config for partial-results view
    When  "<query>" is searched
    Then  less than 4 related results are displayed
    And   partial results are displayed
    And   "<query>" contains the partial query
    When  first partial query button is clicked
    Then  first partial query is displayed in the search-box
    And   at least 4 related results are displayed
    And   no partial results are displayed

    Examples:
      | query             |
      | lego verde y azul |


