require('dotenv').config()
const puppeteer = require('puppeteer-core');
const expect = require('expect-puppeteer');

const SignInTest = require('./sign-in-test');
const SignOutTest = require('./sign-out-test');
const UpdateProfileTest = require('./update-profile-test');

expect.setDefaultOptions({ timeout: 5000 });

(async () => {

    //Launch Puppeteer
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--incognito'],
        headless: false,
        args:[
          '--start-maximized'
        ]
    });
    const pages = await browser.pages();
    const page = pages[0];

    //Configure Browser
    await page.setViewport({
        width: 1280,
        height: 720,
    });
    
    //Main Code
    try {

        await page.goto('https://collab-calendar.vercel.app/login');

        await new SignInTest({
          debug: true,
          screenshot: true,
        }).testAll(page);

        await new SignOutTest({
          debug: true,
          screenshot: true,
        }).testAll(page);

        await new UpdateProfileTest({
          debug: true,
          screenshot: true,
        }).testAll(page);


    }
    finally {
        await browser.close();
    }
})();
