import ProductActions from '../web/actions/product.action';
import Logger from "../helpers/logger.helper";
import HomePage from '../web/pageObjects/home.page';
import CartPage from '../web/pageObjects/cart.page';
import ProductData from '../data/products.data';
import AuthenticationData from '../data/authentication.data';

describe('Filter', () => {
    it('PRD-001 - Verify user can filter product', async () => {
        await HomePage.open()
        const categories = [ProductData.productCategories.phone, ProductData.productCategories.laptop, ProductData.productCategories.monitor]
        for (const category of categories) {
            await ProductActions.filter(category, true)
            let actualProducts = await ProductActions.getProductSummariesFromScreen()
            let expectedProducts = await ProductActions.getProductSummariesFromAPI(category)

            Logger.verify(`Verify that filter results of category [${category.name}] displayed correctly`)
            expect(actualProducts).toEqual(expectedProducts)
        }
    });
});

describe('Ordering', () => {
    it('CAR-056 - Verify user can successfully complete purchase with valid order details', async () => {
        const product1 = {name: 'Sony xperia z5', category: ProductData.productCategories.phone, quantity: 2}
        const product2 = {name: 'MacBook Pro', category: ProductData.productCategories.laptop, quantity: 1}

        await HomePage.open()
        const orderingProducts = [product1, product2]
        await ProductActions.placeOrder(orderingProducts, AuthenticationData.purchaseInfo.validInfo1, false)

        Logger.verify('Verify popup ordering success displayed after purchases')
        expect(await CartPage.isThankYouPopupDisplayed()).toBe(true)
        await CartPage.clickOnButtonOK()

        Logger.verify('Verify popup ordering success disappear after confirmed')
        expect(await CartPage.isThankYouPopupDisplayed()).toBe(false)
    });

    it('CAR-059 - Verify user is redirected to Home after confirmed purchasing', async () => {
        const product1 = {name: 'Sony xperia z5', category: ProductData.productCategories.phone, quantity: 2}
        const product2 = {name: 'MacBook Pro', category: ProductData.productCategories.laptop, quantity: 1}

        await HomePage.open()
        const orderingProducts = [product1, product2]
        await ProductActions.placeOrder(orderingProducts, AuthenticationData.purchaseInfo.validInfo1, true)

        Logger.verify('Verify user is redirected to Home page')
        expect(await HomePage.isFilterSectionDisplayed()).toBe(true)
    });
});

