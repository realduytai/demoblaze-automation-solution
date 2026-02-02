import BasePage from "./base.page.ts"
import BaseControl from "./../controls/base.control.ts"
import Link from "./../controls/link.control.ts"
import Logger from "../../helpers/logger.helper"

const SELECTORS = {
    CATEGORIES: function () {
        return {
            CONTAINER: `//div[@class='list-group']`,
            CATEGORY: function () {
                return `${this.CONTAINER}//a[@id='cat']`
            },
            CATEGORY_BY_TEXT: function (value: string) {
                return `${this.CONTAINER}//a[@id='itemc' and .='${value}']`
            },
        };
    },

    PRODUCT_CARD: function (name: any) {
        return {
            CONTAINER: `//div[contains(@class,'card') and ./a and .//h4[contains(.,'${name}')]]`,
            IMAGE: function () {
                return `${this.CONTAINER}//img`
            },
            NAME: function () {
                return `${this.CONTAINER}//h4/a`
            },
            PRICE: function () {
                return `${this.CONTAINER}//h5`
            },
            DESCRIPTION: function () {
                return `${this.CONTAINER}//p`
            },
        };
    },
}

class HomePage extends BasePage {
    async open() {
        await super.open(process.env.BASE_URL)
    }

    async clickOnCategory(value: string) {
        Logger.action(`Click on category [${value}]`)
        await (await Link.init({text: value, locator:undefined, parentLocator:undefined})).waitThenClick()
    }

    async getProductSummaries() {
        Logger.action(`Get product summaries on screen`);
        let nameElements = await Promise.all(await new BaseControl().findElements(SELECTORS.PRODUCT_CARD('').NAME()))
        let names = await Promise.all(nameElements.map(el => el.getText()))
        let summaries = []

        for (const name of names) {
            summaries.push({
                name: name,
                image: await new BaseControl().getAttribute(SELECTORS.PRODUCT_CARD(name).IMAGE(), 'src'),
                price: await new BaseControl().getText(SELECTORS.PRODUCT_CARD(name).PRICE()),
                description: await new BaseControl().getText(SELECTORS.PRODUCT_CARD(name).DESCRIPTION()),
            })
        }

        Logger.info('Product summaries from screen: ' + JSON.stringify(summaries))
        return summaries
    }

    async clickOnProduct(name: string) {
        Logger.action(`Click on product name [${name}]`)
        await (await Link.init({text: name, locator:undefined, parentLocator:undefined})).waitThenClick()
    }

    async isFilterSectionDisplayed() {
        Logger.action(`Check if filter section is displayed`)
        return await new BaseControl().isDisplayed(SELECTORS.CATEGORIES().CONTAINER)
    }
}

export default new HomePage()
