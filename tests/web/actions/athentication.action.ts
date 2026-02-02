import SharedPage from '../../web/pageObjects/shared.page';
import HomePage from '../../web/pageObjects/home.page';
import Logger from "../../helpers/logger.helper";

class AuthenticationActions {
    async login(credential: any, login?: boolean, waitSuccess?: boolean) {
        await HomePage.open();
        await SharedPage.goToLogin();
        await SharedPage.inputLoginForm(credential);
        login && await SharedPage.clickOnLoginButton();
        waitSuccess && await SharedPage.waitForLoginPopupDisappear();
    }

    async getLoggedBuyerName() {
        Logger.action(`Get logged buyer name from top menu`);
        let name = (await SharedPage.getTopMenuItems()).find(item => item.startsWith('Welcome')).replace('Welcome ', '')
        Logger.info("Buyer's name: " + name);
        return name;
    }
}

export default new AuthenticationActions();
