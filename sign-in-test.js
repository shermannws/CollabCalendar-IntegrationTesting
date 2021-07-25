require('dotenv').config()
const puppeteer = require('puppeteer-core');
const expect = require('expect-puppeteer');
const Utility = require('./utility');

class SignInTest {
  constructor(options) {
    this.utility=new Utility(options);
    this.dir = 'images/sign-in-test';
    this.utility.pathCheck(this.dir);
}

  async testAll(page) {
    this.utility.debug("--SignInTest");
    await this.testSignIn(page);
    this.utility.debug("--SignInTest --> DONE");
    return this;
  }

  // Test Signing In
  async testSignIn(page) {
    //Test
    this.utility.debug('--SignInTest --> testSignIn');

    await expect(page).toFill('div#email > input', process.env.EMAIL);
    await expect(page).toFill('div#password > input', process.env.PASSWORD);
    await expect(page).toClick('button.btn-primary', {text: /Log In/});
    await page.waitForTimeout(500);


    //Check
    this.utility.debug('--SignInTest --> testSignIn --> Confirming Logged In');

    await expect(page).toMatchElement('div > strong', {text: "Pending Responses"});
    await expect(page).toMatchElement('div > strong', {text: "My Groups"});
    await this.utility.screenshot(page, this.dir + '/1-Signed In.png', {});

    //Done
    this.utility.debug('--SignInTest --> testSignIn --> DONE');
  }
}

module.exports = SignInTest;