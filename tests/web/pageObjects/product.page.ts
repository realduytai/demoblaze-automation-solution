import BasePage from "./base.page"
import Link from "./../controls/link.control"
import Logger from "../../helpers/logger.helper"

const SELECTORS = {
    ADD_TO_CART_BUTTON: 'Add to cart'
}

class ProductPage extends BasePage {
    async clickOnButtonAddToCart() {
        Logger.action(`Click on button [${SELECTORS.ADD_TO_CART_BUTTON}]`)
        await (await Link.init({text: SELECTORS.ADD_TO_CART_BUTTON, locator:undefined, parentLocator:undefined})).waitThenClick()
    }
}

export default new ProductPage()
