import BaseControl from "./base.control"

const SELECTORS = {
    LINK_BY_TEXT: (text: any) => `//a[.="${text}"]`
};

class Link extends BaseControl {
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
            element = await super.findElement(SELECTORS.LINK_BY_TEXT(selector.text));
            origin = SELECTORS.LINK_BY_TEXT(selector.text)
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
            element = await super.findElement(selector.parentLocator + SELECTORS.LINK_BY_TEXT(selector.text));
            origin = selector.parentLocator + SELECTORS.LINK_BY_TEXT(selector.text)
        }

        return new Link(element, origin)
    }

    async isDisplayed() {
        return await super.isDisplayed(this.element);
    }

    async waitThenClick() {
        await super.waitThenClick(this.element);
    }
}

export default new Link();
