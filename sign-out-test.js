require('dotenv').config()
const puppeteer = require('puppeteer-core');
const expect = require('expect-puppeteer');
const Utility = require('./utility');

class SignOutTest {
  constructor(options) {
    this.utility=new Utility(options);
    this.dir = 'images/sign-out-test';
    this.utility.pathCheck(this.dir);
}

  async testAll(page) {
    this.utility.debug("--SignOutTest");
    await this.testSignOut(page);
    await this.testSignIn(page);
    this.utility.debug("--SignOutTest --> DONE");
    return this;
  }

  // Test Signing Out
  async testSignOut(page) {
    //Test
    this.utility.debug('--SignOutTest --> testSignOut');

    await expect(page).toClick('div.nav-item.dropdown > a', {text: /Signed in as:/});
    await expect(page).toClick('a.dropdown-item', {text: /Log Out/});
    await page.waitForTimeout(500);

    //Check
    this.utility.debug('--SignOutTest --> testSignOut --> Confirming Logged Out');

    await expect(page).toMatchElement('button.btn-outline-primary', {text: "Log In with Google"});
    await this.utility.screenshot(page, this.dir + '/1-Signed Out.png', {});

    //Done
    this.utility.debug('--SignOutTest --> testSignOut --> DONE');
  }

  // Test Signing In
  async testSignIn(page) {
    //Test
    this.utility.debug('--SignOutTest --> testSignIn');

    await expect(page).toFill('div#email > input', process.env.EMAIL);
    await expect(page).toFill('div#password > input', process.env.PASSWORD);
    await expect(page).toClick('button.btn-primary', {text: /Log In/});
    await page.waitForTimeout(500);


    //Check
    this.utility.debug('--SignOutTest --> testSignIn --> Confirming Logged In');

    await expect(page).toMatchElement('div > strong', {text: "Pending Responses"});
    await expect(page).toMatchElement('div > strong', {text: "My Groups"});
    await this.utility.screenshot(page, this.dir + '/2-Signed In.png', {});

    //Done
    this.utility.debug('--SignOutTest --> testSignIn --> DONE');
  }
}

module.exports = SignOutTest;