const items = [
        {
            "code": "FR1",
            "name": "Fruit tea",
            "price": 3.11,
        },
        {
            "code": "SR1",
            "name": "Strawberries",
            "price": 5.00,
        },
        {
            "code": "CF1",
            "name": "Coffee",
            "price": 11.23,
        }
    ];

const twoForOneItemCodes = ["FR1"];
const multibuyOffers = [{code:"SR1", quantity: 3, discountedPrice: 4.50}];
        
const twoForOneChecker = item => twoForOneItemCodes.some(code => code === item);

const multibuyChecker = (item, quantity) => {
    const discount = multibuyOffers.filter(offer => offer.code === item && offer.quantity <= quantity);

    return discount.length > 0 ? discount[0].discountedPrice : null;
}

const pricingRules = {
    "items": items,
    "twoForOneItemCodes": twoForOneItemCodes,
    "multibuyOffers": multibuyOffers,
    "twoForOneChecker" : twoForOneChecker,
    "multibuyChecker": multibuyChecker
};

class Basket {
    constructor(pricingRules) {
        this.pricingRules = pricingRules; 
        this.contents = [];
    }

    add(item) {
        this.contents.push(item);
    }

    total() {
        const uniqueBasketItems = [...new Set(this.contents)];
        let total = 0;

        uniqueBasketItems.forEach(item => {
            const itemCount = this.contents.filter(basketItem => basketItem === item).length;
            const twoForOneResult = pricingRules.twoForOneChecker(item);
            const multibuyResult = pricingRules.multibuyChecker(item, itemCount);
            const price = pricingRules.items.filter(object => object.code === item)[0].price;
            
            let itemTotal = multibuyResult ? itemCount * multibuyResult 
                          : twoForOneResult ? (Math.floor(itemCount / 2) + (itemCount % 2)) * price
                          : itemCount * price;
            
            total += itemTotal;
        })
        
        return "£" + total.toFixed(2);
        }
    }

module.exports = { Basket, pricingRules };