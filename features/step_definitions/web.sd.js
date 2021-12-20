// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');
const { Login } = require("../../src/PO/login.po");
const { Navigation } = require("../../src/PO/navigation.po");
const { Subscription } = require("../../src/PO/subscription.po");
const { CustomPage } = require("../../src/PO/custom_page.po");
const { CustomPage2 } = require("../../src/PO/custom_page_2.po");
const { Table } = require("../../src/PO/tables/table.po");
const Subscribe = require('../../src/PO/forms/subscribe.model');
const {
    addStep,
    addFeature,
    addAttachment,
    addIssue,
    addArgument,
    addSeverity,
    addEnvironment,
    addLabel,
    addTestId,
    addDescription,
    addStory,
} = require('@wdio/allure-reporter').default;

When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
});

When(/^I check the texts of the elements:$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        expect(await $(row.selector).getText())
            .toEqual(row.text)
    }
});

When(/^I expect element: "([^"]*)" (text|value): "([^"]*)"$/, async function (selector, type, text) {
    const methods = {
        text: 'getText',
        value: 'getValue'
    }
    expect(await $(selector)[methods[type]]())
        .toEqual(text)
});

When(/^I go to Create new User menu item$/, async function () {
    await Navigation.goToCreateUserMenuItem();
});

When(/^I go to Create new Subscriptions menu item$/, async function () {
    await Navigation.goToCreateSubscriptionMenuItem();
});

When('I login as: {string}, {string}', async function (login, password) {
    await Login.login({ username: login, password: password });
});

Then('I log out', async function () {
    await $('//a[@title="Log out"]').click();
    await $('//button[contains(., "Login")]').waitForDisplayed();
});

async function invokeMethodOnPo(action, pretext, po, element, parameters) {
    if ('string' === (typeof parameters)) {
        if (parameters.includes('[')) {
            paramsArr = JSON.parse(parameters)
            await eval(po)[element][action](...paramsArr);
            return
        }
        await eval(po)[element][action](parameters);
    }
}

When(/^I (\w+) (on|at|in|into) (\w+) (\w+)(?:| with parameters:)$/, async function (action, pretext, po, element) {
    await invokeMethodOnPo(action, pretext, po, element)
});

When(/^I (\w+) (on|at|in|into) (\w+) (\w+) with parameters: '([^']*)'$/, async function (action, pretext, po, element, parameters) {
    await invokeMethodOnPo(action, pretext, po, element, parameters)
});


When(/^I search for "([^"]*)"$/, async function (text) {
    await CustomPage.search.setValue(text);
    await CustomPage2.header.search.setValue(text);
});

When(/^I sort table by "([^"]*)"$/, async function (name) {
    const data = await Table.data();
    const head = await (await Table.headers()).filter(item => item.name === name)[0].element.click();
    console.log({ head });
    console.log({ data })
    // console.log(JSON.stringify(data));
});


When(/^I fill email: \"([^\"]*)\"$/, async function (field) {
    await $('#email').setValue(field);
});

When(/^I fill password: \"([^\"]*)\"$/, async function (field) {
    await $('#password').setValue(field);
});

When(/^I fill address1: \"([^\"]*)\"$/, async function (field) {
    await $('#address1').setValue(field);
});

When(/^I fill address2: \"([^\"]*)\"$/, async function (field) {
    await $('#address2').setValue(field);
});

When(/^I fill city: \"([^\"]*)\"$/, async function (field) {
    await $('#city').setValue(field);
});

When(/^I fill zip: \"([^\"]*)\"$/, async function (field) {
    await $('#zip').setValue(field);
});

When(/^I fill anual: \"([^\"]*)\"$/, async function (field) {
    await $('#anual').setValue(field);

});

When(/^I fill description: \"([^\"]*)\"$/, async function (field) {
    await $('#description').setValue(field);
});

When('I click Create button', async function () {
    await $('//button[contains(., "Create")]').click();
});

Then(/^I fill and check Subscription form for user: \"([^\"]*)\"$/, async function (email) {
    addAttachment('Subscription property:', `Plan: Premium, Years: 2, User: ${email}, Total: 10, Description: test description`);
    await Subscription.fillAndCheckForm(email);
});
