import BaseControl from "./base.control"

const SELECTORS = {
    TEXTBOX_BY_LABEL: (label: any) => `//input[preceding-sibling::label[.="${label}"]]`
};

class TextBox extends BaseControl {
    private readonly element: any
    private readonly origin: string

    constructor(element: any = null, origin: string = null) {
        super();
        this.element = element;
        this.origin = origin;
    }

    async init(selector:{ label?: string, locator?: string, parentLocator?: string }) {
        let element: any
        let origin: string

        if (selector.label && !selector.locator && !selector.parentLocator){
            element = await super.findElement(SELECTORS.TEXTBOX_BY_LABEL(selector.label))
            origin = SELECTORS.TEXTBOX_BY_LABEL(selector.label)
        }
        if (!selector.label && selector.locator && !selector.parentLocator){
            element = await super.findElement(selector.locator)
            origin = selector.locator
        }
        if (!selector.label && selector.locator && selector.parentLocator){
            element = await super.findElement(selector.parentLocator + selector.locator)
            origin = selector.parentLocator + selector.locator
        }
        if (selector.label && !selector.locator && selector.parentLocator){
            element = await super.findElement(selector.parentLocator + SELECTORS.TEXTBOX_BY_LABEL(selector.label))
            origin = selector.parentLocator + SELECTORS.TEXTBOX_BY_LABEL(selector.label)
        }

        return new TextBox(element, origin)
    }

    async isDisplayed() {
        return await super.isDisplayed(this.element)
    }

    async enterValue(value: any) {
        await super.enterValue(this.element, value)
    }
}

export default new TextBox()
