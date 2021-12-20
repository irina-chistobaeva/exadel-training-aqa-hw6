class Subscription {
    // components
    get main() {
        return $('form');
    }

    get plan() {
        return this.main.$('#plan');
    }

    get years() {
        return this.main.$('#years');
    }

    get user() {
        return this.main.$('#user');
    }

    get total() {
        return this.main.$('#total');
    }

    get description() {
        return this.main.$('#description');
    }

    get suspendCheckbox() {
        return this.main.$('#suspend');
    }

    get createButton() {
        return this.main.$('button');
    }

    // actions
    async fillAndCheckForm(user) {
        await this.plan.selectByVisibleText('Premium');
        await this.years.setValue('2');
        await this.user.selectByVisibleText(user);
        await this.total.setValue('10');
        await this.description.setValue('test description');
        await this.createButton.click();

        await $('//h3[contains(.,"List of Subscriptions")]').waitForDisplayed({ timeoutMsg: 'cannot open the page' });
        let userRow = await $(`//*[text()="${user}"]/..`);
        expect(await userRow.$('(.//div[@class="tabulator-cell"])[1]').getText()).toEqual('PREM');
        expect(await userRow.$('(.//div[@class="tabulator-cell"])[2]').getText()).toEqual(user);
        expect(await userRow.$('(.//div[@class="tabulator-cell"])[3]').getText()).toEqual('2');
        expect(await userRow.$('(.//div[@class="tabulator-cell"])[4]').getText()).toEqual('10');
        expect(await userRow.$('(.//div[@class="tabulator-cell"])[5]').getText()).toEqual(' ');
        expect(await userRow.$('(.//div[@class="tabulator-cell"])[6]').getText()).toEqual('test description');
    }
}

module.exports = { Subscription: new Subscription() }