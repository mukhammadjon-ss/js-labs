// KEPT EVERYTHING IN A SINGLE FILE FOR EASIER READING

// 1. Product Class
class Product {
  constructor(
    public name: string,
    public price: number,
    public stock: number
  ) {}

  addStock(quantity: number) {
    this.stock += quantity;
  }

  reduceStock(quantity: number) {
    if (quantity > this.stock) {
      throw new Error(`Not enough ${this.name}s in stock`);
    }
    this.stock -= quantity;
  }
}

// 2. Customer Class
class Customer {
  cart: Array<Product> = [];

  constructor(
    public name: string,
    public email: string,
    public address: string
  ) {}

  addToCart(product: Product) {
    this.cart.push(product);
  }

  removeFromCart(product: Product) {
    const indexOfProduct = this.cart.indexOf(product);
    this.cart.splice(indexOfProduct, 1);
  }
}

// 3. Order Abstract Class
abstract class Order {
  public totalPrice: number = 0;

  constructor(public customer: Customer, public products: Array<Product>) {}

  abstract calculateTotalPrice(): void;
}

// 4. PhysicalOrder Class (Inheritance)
class PhysicalOrder extends Order {
  deliveryDate: string;
  shippingAddress: string;

  constructor(customer: Customer, products: Array<Product>) {
    super(customer, products);
    this.shippingAddress = customer.address;
    this.deliveryDate = "16.09.2024";
  }

  calculateTotalPrice() {
    const totalPrice = this.products.reduce(
      (total, product) => total + product.price,
      0
    );
    const shippingCost = 25;
    this.totalPrice = totalPrice + shippingCost;
  }
}

// 5. DigitalOrder Class (Inheritance)
class DigitalOrder extends Order {
  calculateTotalPrice() {
    this.totalPrice = this.products.reduce(
      (total, product) => total + product.price,
      0
    );
  }
}

// 6. Payment Abstract Class
abstract class Payment {
  constructor(public amount: number, public order: Order) {}

  abstract processPayment(): void;
}

// 7. CreditCardPayment Class (Polymorphism)
class CreditCardPayment extends Payment {
  constructor(
    amount: number,
    order: Order,
    public cardNumber: string,
    public expirationDate: string
  ) {
    super(amount, order);
  }

  processPayment(): void {
    console.log(`Processing credit card payment of $${this.amount} for order.`);
  }
}

// 8. PayPalPayment Class (Polymorphism)
class PayPalPayment extends Payment {
  constructor(
    amount: number,
    order: Order,
    public email: string,
    public password: string
  ) {
    super(amount, order);
  }

  processPayment(): void {
    console.log(`Processing PayPal payment of $${this.amount} for order.`);
  }
}

// 9. ShippingService Interface
interface ShippingService {
  shipOrder(order: Order): void;
}

// 10. CourierShipping Class (Interface Implementation)
class CourierShipping implements ShippingService {
  shipOrder(order: PhysicalOrder) {
    console.log(
      `Order is being shipped to ${order.shippingAddress} and will arrive by ${order.deliveryDate}.`
    );
  }
}

// 11. EmailDelivery Class (Interface Implementation)
class EmailDelivery implements ShippingService {
  shipOrder(order: DigitalOrder) {
    console.log(`Digital order is being sent to ${order.customer.email}.`);
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
