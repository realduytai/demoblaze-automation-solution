class AuthenticationData {
    constructor() {
    }

    buyers = {
        buyer1: {
            username: 'realduytai',
            password:'Demoblaze2026!'
        },
        buyer2: {
            username: 'TBD',
            password:'TBD'
        }
    };

    purchaseInfo = {
        validInfo1: {
            name: 'Le Duy Tai',
            country: 'Vietnam',
            city: 'Ho Chi Minh',
            cardNumber: '4111 1111 1111 1111',
            month: 12,
            year: 2026
        }
    };
}

export default new AuthenticationData()
