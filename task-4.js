class Product {
    constructor(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock
    }

    addStock(quantity) { };
    reduceStock(quantity) { };
};


class Customer {
    constructor(name, email, cart, address) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this.address = address;
    }

    addToCart(product) { };
    removeFromCart(product) { };
}

class Order {
    constructor(customer, products, totalPrice) {
        if (new.target === Order) {
            throw new Error("Cannot instantiate abstract class Shape directly");
        }
        this.customer = customer;
        this.products = products;
        this.totalPrice = totalPrice;
    }

    calculateTotalPrice() {
        throw Error("This is an abstract method");
    }
}

class PhysicalOrder extends Order {
    constructor(shippingAddress, deliveryDate) {
        super();
        this.shippingAddress = shippingAddress;
        this.deliveryDate = deliveryDate;
    }

    calculateTotalPrice() {
        const totalCost = 0;
        for (const product of this.products) {
            totalCost += product.price; // did not understand how to define shipping cost?
        }
    }
};

class DigitalOrder extends Order {
    constructor(){
        super();
    }
    calculateTotalPrice(){
        for (const product of this.products) {
            totalCost += product.price;
        }
    }
}

class Payment{
    constructor(amount, order) {
        if (new.target === Payment) {
            throw new Error("Cannot instantiate abstract class Shape directly");
        }
        this.amount = amount;
        this.order = order;
    }

    processPayment(){
        throw Error("This is an abstract method should be implemented by subclasses for processing payment.")
    }
}

class CreditCardPayment extends Payment{
    constructor(amount, order, cardNumber, expirationDate){
        super(amount, order);
        this._cardNumber = cardNumber;
        this._expirationDate = expirationDate;
    };

    processPayment(){
        const expDate = new Date(this._expirationDate);
        const today = new Date();
        if(this._cardNumber.length === 16 && expDate > today){
            // I think there should be a code which checks whether it is sufficient amount of money in card or not
            // then subtracs it from card sum then adds it their bank account (something like this, but can't do this for now)
            const success = true; // let it be a promise which resolved successfully
            if(success){
                console.log(`Payment of $${this.amount} for the ${this.order} was successfully. Card holder: ...${this._cardNumber.slice(-4)}`);
            }
        }
    }
}

class PayPalPayment extends Payment{
    constructor(email, password){
        super();
        this.email = email;
        this.password = password;
    };

    processPayment(){

    }
}


const payment = new CreditCardPayment(100, 'Order123', '1234567812345678', '2025-12-31');
payment.processPayment(); 