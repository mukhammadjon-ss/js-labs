class Product {
    constructor(
        public name: string,
        public price: number,
        public stock: number
    ) {}

    addStock(quantity: number) {
        this.stock += quantity;
        return this.stock;
    }

    reduceStock(quantity: number) {
        this.stock = Math.max(this.stock - quantity, 0);
        return this.stock;
    }
}

class Customer {
    constructor(
        public name: string,
        public email: string,
        public cart: Product[] = [],
        public address: string
    ) {}

    addToCart(product: Product) {
        this.cart.push(product);
    }

    removeFromCart(product: Product) {
        for (let i = 0; i < this.cart.length; ++i) {
            if (this.cart[i].name === product.name) {
                return product && this.cart.splice(i, 1);
            }
        }
    }
}

const SHIPPING_COST = 14;

class Order {
    constructor(
        public customer: Customer,
        public products: Product[],
        public totalPrice: number
    ) {}

    calculateTotalPrice() {}
}

class PhysicalOrder extends Order {
    constructor(
        customer: Customer,
        products: Product[],
        totalPrice: number,
        public shippingAddress: string,
        public deliveryDate: Date
    ) {
        super(customer, products, totalPrice);
        this.shippingAddress = shippingAddress;
        this.deliveryDate = deliveryDate;
    }

    calculateTotalPrice() {
        return (
            this.products.reduce(function (totalPrice, product) {
                return totalPrice + product.price;
            }, 0) + SHIPPING_COST
        );
    }
}

class DigitalOrder extends Order {
    constructor(
        customer: Customer,
        products: Product[],
        totalPrice: number
    ) {
        super(customer, products, totalPrice);
    }

    calculateTotalPrice() {
        return this.products.reduce(function (totalPrice, product) {
            return totalPrice + product.price;
        }, 0);
    }
}

class Payment {
    constructor(public amount: number, public order: Order) {}

    processPayment() {}
}

class CreditCardPayment extends Payment {
    constructor(
        amount: number,
        order: Order,
        public cardNumber: string,
        public expirationDate: Date
    ) {
        super(amount, order);
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
    }

    processPayment() {
        console.log("Processing...");
        setTimeout(() => console.log("Card Payment Completed!"), 2000);
    }
}

class PayPalPayment extends Payment {
    constructor(
        amount: number,
        order: Order,
        public email: string,
        public password: string
    ) {
        super(amount, order);
        this.email = email;
        this.password = password;
    }

    processPayment() {
        console.log("Processing...");
        setTimeout(() => console.log("Transaction Complete!"), 2000);
    }
}

interface ShippingService {
    shipOrder(order: Order): void;
}

class CourierShipping implements ShippingService {
    shipOrder() {
        console.log("Courier has started the ride..");
        setTimeout(
            () => console.log("Order delivered successfully!"),
            3000
        );
    }
}

class EmailDelivery implements ShippingService {
    shipOrder(order: Order) {
        const emailContent = `
            Dear Customer,

            Your order has been shipped successfully. Here are the details:

            ${order.products
                .map(
                    product =>
                        `${product.name}: $${product.price.toFixed(2)}`
                )
                .join("\n")}

            Thank you for shopping with us!

            Best regards,
            The EmailDelivery Team
        `;

        console.log(`Sending email to customer..`);
        console.log(emailContent);
    }
}
