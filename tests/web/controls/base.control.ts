export default class BaseControl {
    constructor() {
    }

    async waitThenClick(selector: string) {
        const element = typeof selector === 'string' ? browser.$(selector) : selector
        await element.waitForDisplayed({ timeout: 5000 })
        await element.click()
    }

    async click(selector: string) {
        const element = typeof selector === 'string' ? browser.$(selector) : selector
        await element.click()
    }

    async enterValue(selector: string, value: string) {
        const element = typeof selector === 'string' ? browser.$(selector) : selector
        await element.waitForDisplayed({ timeout: 5000 })
        await element.setValue(value)
    }

    async isDisplayed(control: any, timeout = 8000) {
        const element = typeof control === 'string' ? browser.$(control) : control
        try {
            await element.waitForDisplayed({ timeout: timeout })
            return true
        } catch (err) {
            return false
        }
    }

    async findElement(selector: any) {
        return browser.$(selector)
    }

    async findElements(selector: any) {
        return browser.$$(selector)
    }

    async getClass(selector: any) {
        return browser.$(selector).getAttribute('class')
    }

    async getAttribute(selector: any, name: any) {
        return browser.$(selector).getAttribute(name)
    }

    async getText(selector: any) {
        return browser.$(selector).getText()
    }
}