import BasePage from "./base.page"
import BaseControl from "./../controls/base.control"
import Link from "./../controls/link.control"
import Dialog from "./../controls/dialog.control"
import Button from "./../controls/button.control"
import Logger from "../../helpers/logger.helper"

const SELECTORS = {
    PLACE_ORDER_HEADER: 'Place order',
    PURCHASE_BUTTON: 'Purchase',
    PLACE_ORDER_BUTTON: 'Place Order',
    THANK_YOU_POPUP: `//div[contains(@class, 'sweet-alert') and ./h2[.='Thank you for your purchase!']]`,
    OK_BUTTON: 'OK'
}

class CartPage extends BasePage {
    async clickOnButtonPlaceOrder() {
        Logger.action(`Click on button [${SELECTORS.PLACE_ORDER_BUTTON}]`)
        await (await Button.init({text: SELECTORS.PLACE_ORDER_BUTTON, locator:undefined, parentLocator:undefined})).waitThenClick()
    }

    async clickOnButtonPurchase() {
        Logger.action(`Click on button [${SELECTORS.PURCHASE_BUTTON}] of dialog [${SELECTORS.PLACE_ORDER_HEADER}]`)
        await (await Dialog.init({text: SELECTORS.PLACE_ORDER_HEADER})).clickOnButton(SELECTORS.PURCHASE_BUTTON)
    }

    async inputOrderForm(info: {name: string, country: string, city: string, cardNumber: string, month: string, year: string}) {
        const dialog = await Dialog.init({text: SELECTORS.PLACE_ORDER_HEADER})
        info.name && await dialog.enterTextBoxByLabel('Name:', info.name )
        info.country && await dialog.enterTextBoxByLabel('Country:', info.country )
        info.city && await dialog.enterTextBoxByLabel('City:', info.city )
        info.cardNumber && await dialog.enterTextBoxByLabel('Credit card:', info.cardNumber )
        info.month && await dialog.enterTextBoxByLabel('Month:', info.month )
        info.year && await dialog.enterTextBoxByLabel('Year:', info.year )
    }

    async clickOnButtonOK() {
        Logger.action(`Click on button [${SELECTORS.OK_BUTTON}] of popup ordering success`)
        await (await Button.init({text: SELECTORS.OK_BUTTON, parentLocator:SELECTORS.THANK_YOU_POPUP})).waitThenClick()
        await super.waitForPageLoaded()
    }

    async isThankYouPopupDisplayed() {
        Logger.action(`Check if popup orders success is displayed`)
        return await new BaseControl().isDisplayed(SELECTORS.THANK_YOU_POPUP)
    }
}

export default new CartPage()
