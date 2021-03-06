module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price.slice(0, -1) * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price * 1;
    };

    this.increseByOne = function (id) {
        
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price.slice(0, -1) * 1;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price.slice(0, -1) * 1;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price.slice(0, -1) * 1;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price.slice(0, -1) * 1;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };


    this.generateArray = function () {
        const arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
