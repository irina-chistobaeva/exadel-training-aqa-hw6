class Navigation {
    // components
    get main() {
        return $('#sidebarMenu');
    }

    get createUser() {
        return this.main.$('//a[contains(.,"Create User")]');
    }

    get createManager() {
        return this.main.$('//a[contains(.,"Create Manager")]');
    }

    get createSubscription() {
        return this.main.$('//a[contains(.,"Create Subscription")]');
    }

    get listOfUsers() {
        return this.main.$('//a[contains(.,"List of users")]');
    }

    get listOfSubscriptions() {
        return this.main.$('//a[contains(.,"List of Subscriptions")]');
    }

    // actions
    async goToCreateUserMenuItem() {
        await this.createUser.click();
        await $('//h3[contains(.,"Create new User")]').waitForDisplayed({ timeoutMsg: 'cannot open the page' });
    }

    async goToCreateManagerMenuItem() {
        await this.createManager.click();
        await $('//h3[contains(.,"Create new Manager")]').waitForDisplayed({ timeoutMsg: 'cannot open the page' });
    }

    async goToCreateSubscriptionMenuItem() {
        await this.createSubscription.click();
        await $('//h3[contains(.,"Create new Subscriptions")]').waitForDisplayed({ timeoutMsg: 'cannot open the page' });
    }

    async goToListOfUsersMenuItem() {
        await this.listOfUsers.click();
        await $('//h3[contains(.,"List of Users")]').waitForDisplayed({ timeoutMsg: 'cannot open the page' });
    }

    async goToListOfSubscriptionsMenuItem() {
        await this.listOfSubscriptions.click();
        await $('//h3[contains(.,"List of Subscriptions")]').waitForDisplayed({ timeoutMsg: 'cannot open the page' });
    }
}

module.exports = { Navigation: new Navigation() }