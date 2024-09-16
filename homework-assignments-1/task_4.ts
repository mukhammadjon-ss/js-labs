class Product {
    name:string;
    price:number;
    stock:number;
    constructor(name:string, price:number, stock:number) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    addStock(quantity:number):void{
        this.stock += quantity;
        console.log(`${quantity} items added. New stock: ${this.stock}`);
    };
    removeStock(quantity:number):void{
        this.stock -= quantity;
        console.log(`${quantity} items removed. New stock: ${this.stock}`);
    }
}

class Customer {
    name: string;
    email:string;
    cart: Product[]
    address:string;

    constructor(name:string, email:string, address:string) {
        this.name = name;
        this.email = email;
        this.cart = [];
        this.address = address;
    }
    addToCart(product:Product):void{
        this.cart.push(product);
        console.log(`Adding ${product} to the stock`)
    }
    removeFromCart(product:Product):void{
        this.cart = this.cart.filter(p => p !== product);
        console.log(`Removing ${product} from the stock`)
    }
}

abstract class Order {
    customer: Customer;
    products: Product[];
    totalPrice: number;

    constructor(customer: Customer, products: Product[]) {
        this.customer = customer;
        this.products = products;
        this.totalPrice = 0;
    }

    abstract calculateTotalPrice():void
}

class PhysicalOrder extends Order{
    shippingAddress:string;
    deliveryDate:string;
    constructor(customer: Customer, products:Product[],shippingAddress:string, deliveryDate:string) {
        super(customer,products);
        this.shippingAddress = shippingAddress;
        this.deliveryDate = deliveryDate;
    }
    calculateTotalPrice() {
        const productTotal = this.products.reduce((total, product) => total + product.price, 0);
        const shippingCost = 10;
        return productTotal + shippingCost;
    }
}

class DigitalOrder extends Order{
    calculateTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}

abstract class Payment {
    amount: number;
    order:number;
    protected constructor(amount:number, order:number) {
        this.amount = amount;
        this.order = order;
    }

    abstract processPayment():void;
}

class CreditCardPayment extends Payment {
    cardNumber:string;
    expirationDate:string;

    constructor(cardNumber:string, expirationDate:string,amount:number, order:number) {
        super(order,amount);
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
    }
    processPayment():void {
        console.log(`The payment is processing by ${this.amount} amount for order...`);
    }
}

class PayPal extends Payment{
    email:string;
    password:string;

    constructor(email:string, amount:number, password:string,order:number) {
        super(amount, order);
        this.email = email
        this.password = password
    }

    processPayment() {
        console.log(`The payment is processing by Paypal for ${this.amount} amount for order...`);
    }
}
interface ShippingService {
    shipOrder(order: PhysicalOrder):void
 }

 class CourierShipping implements ShippingService{
    shipOrder(order: PhysicalOrder) {
        console.log(`Shipping order is to address ${order.shippingAddress} time ${order.deliveryDate}.`)
    }
 }

 class EmailDelivery implements ShippingService{
    shipOrder(order: PhysicalOrder) {
        console.log(`Shipping delivered by email address ${order.customer.email}.`)
    }
 }


// Create some products
const product1 = new Product('Laptop', 1200, 10);
const product2 = new Product('Smartphone', 800, 20);

// Create a customer
const customer = new Customer('John Doe', 'john.doe@example.com', '123 Main St, City');

// Customer adds products to the cart
customer.addToCart(product1);
customer.addToCart(product2);

// Create a physical order (shipping required)
const physicalOrder = new PhysicalOrder(customer, customer.cart, customer.address, '2024-09-20');
const totalPhysicalPrice = physicalOrder.calculateTotalPrice();
console.log(`Total price for physical order: $${totalPhysicalPrice}`);

// Create a digital order (no shipping required)
const digitalOrder = new DigitalOrder(customer, customer.cart);
const totalDigitalPrice = digitalOrder.calculateTotalPrice();
console.log(`Total price for digital order: $${totalDigitalPrice}`);

// Process payment with Credit Card for the physical order
const creditCardPayment = new CreditCardPayment('1234-5678-9876-5432', '12/25', totalPhysicalPrice, physicalOrder.totalPrice);
creditCardPayment.processPayment();

// Process payment with PayPal for the digital order
const paypalPayment = new PayPal('john.doe@example.com', totalDigitalPrice, 'securepassword', digitalOrder.totalPrice);
paypalPayment.processPayment();

// Ship the physical order using courier
const courierShipping = new CourierShipping();
courierShipping.shipOrder(physicalOrder);

// Deliver the digital order via email
const emailDelivery = new EmailDelivery();
emailDelivery.shipOrder(physicalOrder); // Note: This should ideally be a digital order

