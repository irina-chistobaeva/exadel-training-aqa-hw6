Feature: User With Subscription Creation

    Background:
        When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"
        When I login as: "walker@jw.com", "password"

    Scenario: Create user with "<email>" email
        When I go to Create new User menu item
        And I fill email: "<email>"
        And I fill password: "<password>"
        And I fill address1: <address1>
        And I fill address2: <address2>
        And I fill city: "<city>"
        And I fill zip: "<zip>"
        And I fill anual: "<anual>"
        And I fill description: <description>
        And I click Create button

        When I go to Create new Subscriptions menu item
        Then I fill and check Subscription form for user: "<email>" with annual payment: "<anual>"
        Then I log out

        Examples:
            | email          | password | address1   | address2 | city | zip   | anual | description        |
            | test1@test.com | qwerty1  | "tesr str" | "1-2"    | NY   | 12345 | 100   | "Test description" |
            | test2@test.com | qwerty2  | "tesr str" | "2-2"    | NY   | 12345 | 200   | "Test description" |
            | test3@test.com | qwerty3  | "tesr str" | "3-2"    | NY   | 12345 | 300   | "Test description" |
