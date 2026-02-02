import Logger from "../../helpers/logger.helper";

export default class BasePage {
    constructor() {
    }

    async open(path: string) {
        await this.resizeWindowToFitOnMacOS()
        await browser.navigateTo(path);
        await this.waitForPageLoaded()
    }

    async resizeWindowToFitOnMacOS() {
        await browser.maximizeWindow()
    }

    async getBrowserAlert(accept?: boolean) {
        const msg = await browser.getAlertText()
        accept ? await this.acceptAlert() : await this.dismissAlert()
        Logger.info('Browser message: ' + msg)
        return msg
    }

    async acceptAlert() {
        await browser.acceptAlert()
    }

    async dismissAlert() {
        await browser.dismissAlert()
    }

    async waitForPageLoaded() {
        await browser.waitUntil(
            async () => ((await browser.execute(() => document.readyState)) === 'complete') && (await browser.executeScript("return jQuery.active", [])) == 0, {
                timeout: 15000,
                timeoutMsg: 'Website not loaded',
                interval: 2000
            });
    }
}
