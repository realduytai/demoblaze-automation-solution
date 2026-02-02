import HomePage from '../../web/pageObjects/home.page';
import ProductPage from '../../web/pageObjects/product.page';
import SharedPage from '../../web/pageObjects/shared.page';
import CartPage from '../../web/pageObjects/cart.page';
import {trimBreakLines, trimMultipleSpaces, trimSpaces} from "../../helpers/string.helper";
import {getProducts} from "../../api/requests/product.request";

class ProductActions {
    async filter(criteria: any, wait?: boolean) {
        await HomePage.clickOnCategory(criteria.name)
        wait && await HomePage.waitForPageLoaded()
    }

    async getProductSummariesFromScreen() {
        return await HomePage.getProductSummaries()
    }

    async getProductSummariesFromAPI(criteria: any) {
        let productFromApi = (await getProducts(criteria)).body.Items
        let returnedProducts = []
        productFromApi.map((product: any) => returnedProducts.push({
            name: trimBreakLines(product.title),
            image: product.img,
            price: '$' + product.price,
            description: trimSpaces(product.desc.replace(/\n/g, ' '))
        }))
        return returnedProducts;
    }

    async accessProduct(criteria: any) {
        await HomePage.clickOnProduct(criteria.name)
        await HomePage.waitForPageLoaded()
    }

    async addProductToCart(criteria: any, quantity: number) {
        await this.accessProduct(criteria)
        for (let i = 0; i < quantity; i++) {
            await ProductPage.clickOnButtonAddToCart()
            await ProductPage.acceptAlert()
        }
    }

    async goToCart() {
        await SharedPage.clickOnMenuItem('Cart')
    }

    async placeOrder(products: Array<any>, purchaseInfo: any, confirmSuccess: boolean) {
        for (const product of products) {
            await this.filter(product.category, true)
            await this.addProductToCart(product, product.quantity)
            await SharedPage.goToHome()
        }
        await SharedPage.goToCart()
        await CartPage.clickOnButtonPlaceOrder()
        await CartPage.inputOrderForm(purchaseInfo)
        await CartPage.clickOnButtonPurchase()
        confirmSuccess && await CartPage.clickOnButtonOK()
    }
}

export default new ProductActions();
