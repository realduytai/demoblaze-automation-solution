class ProductsData {
    tiles = {
        addMacro: 'Add Macro',
        actionBlocks: 'Action Blocks',
        // TODO: Add more tiles as needed
    }

    productCategories = {
        phone: {name: 'Phones', code: 'phone'},
        laptop: {name: 'Laptops', code: 'notebook'},
        monitor: {name: 'Monitors', code: 'monitor'},
    }

    constructor() {
    }
}

export default new ProductsData()