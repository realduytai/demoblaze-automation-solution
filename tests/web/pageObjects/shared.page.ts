import BasePage from "./base.page.ts";
import BaseControl from "../controls/base.control";
import Dialog from "../controls/dialog.control";
import Logger from "../../helpers/logger.helper";

const SELECTORS = {
    TOP_MENU: function () {
        return {
            CONTAINER: '//div[@id="navbarExample"]',
            DISPLAYED_ITEM_BY_NAME: function (item: string) {
                return `${this.CONTAINER}//a[contains(text(),"${item}") and not(@style="display:none")]`
            }
        };
    },
    LOGIN_DIALOG: 'Log in',
    CART: 'Cart',
    FOOTER: function () {
        // TODO: TBD
    },
}

class SharedPage extends BasePage {
    constructor() {
        super()
    }

    async clickOnMenuItem(item: string) {
        Logger.action(`Click on menu item [${item}]`);
        await new BaseControl().waitThenClick(SELECTORS.TOP_MENU().DISPLAYED_ITEM_BY_NAME(item));
    }

    async inputLoginForm(credentials: {username: any, password: any}) {
        Logger.action(`Input username [${credentials.username}] and password [${credentials.password}]`);
        await (await Dialog.init({text: SELECTORS.LOGIN_DIALOG})).enterTextBoxByLabel('Username:', credentials.username);
        await (await Dialog.init({text: SELECTORS.LOGIN_DIALOG})).enterTextBoxByLabel('Password:', credentials.password);
    }

    async clickOnLoginButton() {
        Logger.action(`Click on button [Log in] of dialog [${SELECTORS.LOGIN_DIALOG}]`);
        await (await Dialog.init({text: SELECTORS.LOGIN_DIALOG})).clickOnButton('Log in');
    }

    async getTopMenuItems() {
        let listElements = await Promise.all(await new BaseControl().findElements(SELECTORS.TOP_MENU().DISPLAYED_ITEM_BY_NAME('')));
        Logger.info('Length items: ' + listElements.length);

        let items = await Promise.all(listElements.map(async ele => await ele.getText()));
        Logger.info('List of menu items: ' + items);
        return items;
    }

    async waitForLoginPopupDisappear() {
        await (await Dialog.init({text: SELECTORS.LOGIN_DIALOG})).waitForDisappear(10000);
    }

    async isLoginPopupDisplayed() {
        return await (await Dialog.init({text: SELECTORS.LOGIN_DIALOG})).isDisplayed(10000);
    }

    async goToHome() {
        await this.clickOnMenuItem('Home')
        await super.waitForPageLoaded()
    }

    async goToLogin() {
        await this.clickOnMenuItem('Log in')
    }

    async goToCart() {
        await this.clickOnMenuItem('Cart')
        await super.waitForPageLoaded()
    }
}

export default new SharedPage()