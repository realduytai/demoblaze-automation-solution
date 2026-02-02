import AuthenticationActions from '../web/actions/athentication.action';
import SharedPage from '../web/pageObjects/shared.page';
import AuthenticationData from '../data/authentication.data';
import Logger from "../helpers/logger.helper";

describe('Login', () => {
    it('LOG-004 - Verify user can successfully log in from Home page using valid credentials', async () => {
        await AuthenticationActions.login(AuthenticationData.buyers.buyer1, true, true);

        Logger.verify('Verify Login popup is disappeared')
        expect(await SharedPage.isLoginPopupDisplayed()).toBe(false);

        Logger.verify('Verify Name of user display with greeting Welcome')
        expect(await AuthenticationActions.getLoggedBuyerName()).toBe(AuthenticationData.buyers.buyer1.username);
    });

    it('LOG-007 - Verify browser alerts message when leaving login fields empty', async () => {
        await AuthenticationActions.login({username: '', password: ''}, true, false);

        Logger.verify('Verify browser alerts')
        expect(await SharedPage.getBrowserAlert()).toBe('Please fill out Username and Password.');

        Logger.verify('Verify Login popup is still displayed')
        expect(await SharedPage.isLoginPopupDisplayed()).toBe(true);
    });
});
