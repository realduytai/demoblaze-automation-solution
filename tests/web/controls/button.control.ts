import BaseControl from "./base.control"

const SELECTORS = {
    BUTTON_BY_TEXT: (text: any) => `//button[.="${text}"]`
};

class Button extends BaseControl {
    private readonly element: any
    private readonly origin: string

    constructor(element: any = null, origin: string = null) {
        super();
        this.element = element;
        this.origin = origin;
    }

    async init(selector:{ text?: string, locator?: string, parentLocator?: string }) {
        let element: any
        let origin: string

        if (selector.text && !selector.locator && !selector.parentLocator){
            element = await super.findElement(SELECTORS.BUTTON_BY_TEXT(selector.text));
            origin = SELECTORS.BUTTON_BY_TEXT(selector.text)
        }
        if (!selector.text && selector.locator && !selector.parentLocator){
            element = await super.findElement(selector.locator);
            origin = selector.locator
        }
        if (!selector.text && selector.locator && selector.parentLocator){
            element = await super.findElement(selector.parentLocator + selector.locator);
            origin = selector.parentLocator + selector.locator
        }
        if (selector.text && !selector.locator && selector.parentLocator){
            element = await super.findElement(selector.parentLocator + SELECTORS.BUTTON_BY_TEXT(selector.text));
            origin = selector.parentLocator + SELECTORS.BUTTON_BY_TEXT(selector.text)
        }

        return new Button(element, origin)
    }

    async isDisplayed() {
        return await super.isDisplayed(this.element);
    }

    async waitThenClick() {
        await super.waitThenClick(this.element);
    }
}

export default new Button();
