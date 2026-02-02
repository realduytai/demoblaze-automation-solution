import Button from './button.control';
import BaseControl from './base.control';
import TextBox from './textBox.control';
import Logger from "../../helpers/logger.helper";

const SELECTORS = {
    POPUP: (header: any) => ({
        CONTAINER: `//div[@class='modal-content' and .//h5[.='${header}']]//ancestor::div[@role='dialog']`,
        TEXT_BOX_BY_LABEL: function(label: string) {
            return `${this.CONTAINER}//div[@class='form-group' and .//label[.='${label}']]//input`;
        },
        BUTTON_BY_TEXT: function(text: string) {
            return `${this.CONTAINER}//button[@type = 'button' and ./span[.='${text}']]`;
        },
    })
};

class Dialog extends BaseControl {
    private readonly element: any
    private readonly origin: string

    constructor(element: any = null, origin: string = null) {
        super();
        this.element = element;
        this.origin = origin;
    }

    async init(selector:{ text?: string, locator?: string}) {
        let element: any
        let origin: string
        if (selector.text && !selector.locator) {
            element = await super.findElement(SELECTORS.POPUP(selector.text).CONTAINER)
            origin = SELECTORS.POPUP(selector.text).CONTAINER
        }
        if (!selector.text && selector.locator) {
            element = await super.findElement(selector.locator)
            origin = selector.locator
        }
        return new Dialog(element, origin)
    }

    async isDisplayed(_timeout: number) {
        Logger.action(`Check if popup displayed`);
        return (await super.getClass(this.origin)).includes('show');
    }

    async waitForDisappear(timeout: number) {
        Logger.action(`Wait for dialog disappear`);
        await browser.waitUntil(async () => !(await this.isDisplayed(timeout)), {timeout: timeout, interval: 2000})
    }

    async clickOnOkButton() {
        Logger.action(`Click on button [Ok] of dialog`);
        await (await Button.init({text: 'Ok', locator: undefined, parentLocator: this.origin})).waitThenClick();
    }

    async clickOnXButton() {
        Logger.action(`Click on button [X] of dialog`);
        await (await Button.init({text: 'x', locator: undefined, parentLocator: this.origin})).waitThenClick();
    }

    async clickOnCancelButton() {
        Logger.action(`Click on button [Cancel] of dialog`);
        await (await Button.init({text: 'Cancel', locator: undefined, parentLocator: this.origin})).waitThenClick();
    }

    async clickOnCloseButton() {
        Logger.action(`Click on button [Close] of dialog`);
        await (await Button.init({text: 'Close', locator: undefined, parentLocator: this.origin})).waitThenClick();
    }

    async clickOnButton(text: any) {
        Logger.action(`Click on button [${text}] of dialog`);
        await (await Button.init({text: `${text}`, locator: undefined, parentLocator: this.origin})).waitThenClick();
    }

    async enterTextBoxByLabel(label: any, value: any) {
        Logger.action(`Enter value [${value}] into textbox [${label}] of dialog`);
        await (await TextBox.init({label: `${label}`, locator: undefined, parentLocator: this.origin})).enterValue(value);
    }
}

export default new Dialog();