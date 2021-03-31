Feature: Search sort components

  Scenario Outline: 1. Search sort list and dropdown order the results
    Given no special config for sort view
    When  "<query>" is searched
    Then  related results are displayed
    When  sort option "<sortOption1>" is selected from the sort list
    Then  results are ordered accordingly with "<sortOption1>"
    When  sort option "<sortOption2>" is selected from the sort dropdown
    Then  results are ordered accordingly with "<sortOption2>"
    When  sort option "<sortOption3>" is selected from the sort list
    Then  results are ordered accordingly with "<sortOption3>"
    When  sort option "<sortOption1>" is selected from the sort dropdown
    Then  results are ordered accordingly with "<sortOption1>"
    Examples:
      | query | sortOption1          | sortOption2          | sortOption3 |
    #  | lego  | nameSort asc         | nameSort desc        | Relevance   |

