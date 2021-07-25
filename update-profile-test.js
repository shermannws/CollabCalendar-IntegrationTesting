require('dotenv').config()
const puppeteer = require('puppeteer-core');
const expect = require('expect-puppeteer');
const Utility = require('./utility');

class UpdateProfileTest {
  constructor(options) {
    this.utility=new Utility(options);
    this.dir = 'images/update-profile-test';
    this.utility.pathCheck(this.dir);
}

  async testAll(page) {
    this.utility.debug("--UpdateProfileTest");
    await this.testNavigateProfile(page);
    await this.testUpdateDisplayName(page);
    this.utility.debug("--UpdateProfileTest --> DONE");
    return this;
  }

  // Test Navigating to Profile Page
  async testNavigateProfile(page) {
    //Test
    this.utility.debug('--UpdateProfileTest --> testNavigateProfile');

    await expect(page).toClick('div.nav-item.dropdown > a', {text: /Signed in as:/});
    await expect(page).toClick('a.dropdown-item', {text: /Profile/});
    await page.waitForTimeout(500);


    //Check
    this.utility.debug('--UpdateProfileTest --> testNavigateProfile --> Confirming Navigated');

    await expect(page).toMatchElement('p.card-text > strong', {text: "Display Name:"});
    await expect(page).toMatchElement('p.card-text > strong', {text: "Email:"});
    await this.utility.screenshot(page, this.dir + '/1-Navigated.png', {});

    //Done
    this.utility.debug('--UpdateProfileTest --> testNavigateProfile --> DONE');
  }

  // Test Updating the Profile
  async testUpdateDisplayName(page) {
    //Test
    this.utility.debug('--UpdateProfileTest --> testUpdateDisplayName');

    const originalDisplayName =  await page.$eval('p.card-text', el => el.innerText.split(": ")[1]);
    const newDisplayName = Math.random().toString(36).substr(2, 5);

    await expect(page).toClick('div.card-body > a.btn.btn-primary', {text: /Update Profile/});
    await expect(page).toFill('div#display-name > input', newDisplayName);
    await expect(page).toClick('form > button', {text: /Update/});

    await page.waitForTimeout(500);

    //Check
    this.utility.debug('--UpdateProfileTest --> testUpdateDisplayName --> Confirming display name changed');

    await expect(page).toMatchElement('p.card-text', {text: newDisplayName});
    await this.utility.screenshot(page, this.dir + '/2-Updated Display Name.png', {});

    //Revert
    this.utility.debug('--UpdateProfileTest --> testUpdateDisplayName (revert)');

    await expect(page).toClick('div.card-body > a.btn.btn-primary', {text: /Update Profile/});
    await expect(page).toFill('div#display-name > input', originalDisplayName);
    await expect(page).toClick('form > button', {text: /Update/});

    await page.waitForTimeout(500);

    //Revert Check
    this.utility.debug('--UpdateProfileTest --> testUpdateDisplayName (revert)--> Confirming display name reverted');

    await expect(page).toMatchElement('p.card-text', {text: originalDisplayName});
    await this.utility.screenshot(page, this.dir + '/3-Reverted Display Name.png', {});

    //Done
    this.utility.debug('--UpdateProfileTest --> testUpdateDisplayName --> DONE');
  }
}

module.exports = UpdateProfileTest;