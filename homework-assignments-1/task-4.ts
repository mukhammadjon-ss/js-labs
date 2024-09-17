const ShippingCost: Record<string, number> = {
    Tashkent: 10.8,
    London: 15.7,
    Toronto: 11.3,
    Sydney: 14.7
} as const

const userLoginInfo: Record<string, string> = {
    "user@gmail.com": "user123"
} as const

class Product {
    constructor(public name: string, public price: number, public stock: number) { }

    public addStock(quantity: number): void {
        if (quantity > 0) this.stock += quantity;
    }

    public reduceStock(quantity: number): void {
        if (this.stock >= quantity && quantity > 0) this.stock -= quantity;
    }
}

class Customer {
    constructor(public name: string, public email: string, public address: string) { }
    public cart: Product[] = [];

    public addToCart(product: Product): void {
        if (product) this.cart.push(product);
        console.log("Customer Cart:", this.cart);
    }

    public removeFromCart(product: Product): void {
        if (product) {
            this.cart = this.cart.filter(item => item !== product);
            console.log("Customer Cart:", this.cart);
        }
    }
}

abstract class Order {
    constructor(public customer: Customer, public products: Product[], public totalPrice: number) { }

    abstract calculateTotalPrice(): void
}

class PhysicalOrder extends Order {
    constructor(public customer: Customer, public products: Product[]) {
        super(customer, products, 0);
    }

    calculateTotalPrice(): void {
        this.products.forEach(item => this.totalPrice += item.price);
        console.log(`Total price is: ${this.totalPrice}`);

    }
}

class DigitalOrder extends Order {
    constructor(public customer: Customer, public products: Product[], public shippingAddress: string, public deliveryDate: string) {
        super(customer, products, 0);
    }

    calculateTotalPrice(): void {
        this.products.forEach(item => this.totalPrice += (item.price + ShippingCost[this.shippingAddress]));
        console.log(`Total price is: ${this.totalPrice}`);
    }
}

abstract class Payment {
    constructor(public amount: number, public order: Order) { }

    abstract processPayment(): void
}

class CreditCardPayment extends Payment {
    constructor(public amount: number, public order: Order, public cardNumber: string, public expirationDate: string) {
        super(amount, order)
    }

    processPayment(): void {
        const currentDate = new Date();
        const [expMonth, expYear] = this.expirationDate.split("/");
        const checkExpDate = expMonth > currentDate.getMonth().toString() || expYear > currentDate.getFullYear().toString().slice(-2);
        
        if(checkExpDate){
            const productsName = this.order.products.map(item => item.name);
            console.log(`${this.order.customer.name} has just paid $${this.amount} with a credit card for ${productsName.join(", ")}.`);
        }
    }
}

class PayPalPayment extends Payment {
    constructor(public amount: number, public order: Order, public email: string, public password: string) {
        super(amount, order);
    }

    processPayment(): void {
        const productsName = this.order.products.map(item => item.name);
        if (userLoginInfo[this.email] === this.password) {
            console.log(`${this.order.customer.name} has just paid $${this.amount} with PayPal for ${productsName.join(", ")}.`);
        } else{
            console.log("Incorrect username or password.");
        }
    }
}

interface ShippingService{
    shipOrder(order: Order): void
}

class CourierShipping implements ShippingService{
    shipOrder(order: Order): void {
        const productsName = order.products.map(item => item.name);
        console.log(`${order.customer.name}'s order of ${productsName.join(", ")} will be delivered by courier.`);
    }
}

class EmailDelivery implements ShippingService{
    shipOrder(order: Order): void {
        const productsName = order.products.map(item => item.name);
        console.log(`${order.customer.name}'s order of ${productsName.join(", ")} will be sent via email.`);
    }
}



// Create a customer
const customer = new Customer("John Doe", "john@example.com", "123 Main St");

// Create products
const phone = new Product("Smartphone", 699, 10);
const ebook = new Product("Ebook", 29, 100);

// Add products to the cart
customer.addToCart(phone);
customer.addToCart(ebook);

// Create an order
let order = new PhysicalOrder(customer, customer.cart);
order.calculateTotalPrice();

// Process payment
let payment = new CreditCardPayment(
    order.totalPrice,
    order,
    "1234-5678-9876-5432",
    "12/25"
);
payment.processPayment();

// Ship the order
let shippingService = new CourierShipping();
shippingService.shipOrder(order);