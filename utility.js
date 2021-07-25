const fs = require('fs-extra');

class Utility {
    constructor(options){
        const defaultOptions = {
            debug: false,
            screenshot: false,
            screenshotFullPage: true
        };

        this.options = Object.assign(defaultOptions, options);
    }
    async pathCheck(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
    }

    async screenshot(page, path, options) {
        const mergedOptions = Object.assign(this.options, options);
        if(this.options && this.options.screenshot) {
            await page.screenshot({path: path, fullPage: mergedOptions.screenshotFullPage});
        }
        return this;
    }

    debug(msg) {
        if(this.options.debug) {
            console.log(msg)
        }
    }
}

module.exports = Utility;
