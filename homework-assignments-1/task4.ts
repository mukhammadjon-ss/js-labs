// Product Class
class Product {
  name: string;
  price: number;
  stock: number;

  constructor(name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  addStock(quantity: number): string {
    this.stock += quantity;
    return "Stock added";
  }

  reduceStock(quantity: number): number {
    if (this.stock >= quantity) {
      this.stock -= quantity;
      return quantity;
    } else {
      throw new Error("Not enough stock to reduce");
    }
  }
}

// Customer Class
class Customer {
  name: string;
  email: string;
  cart: Product[];
  address: string;

  constructor(name: string, email: string, address: string) {
    this.name = name;
    this.email = email;
    this.cart = [];
    this.address = address;
  }

  addToCart(product: Product): string {
    this.cart.push(product);
    return "Product added";
  }

  removeFromCart(product: Product): string {
    const index = this.cart.indexOf(product);
    if (index > -1) {
      this.cart.splice(index, 1);
      return "Product removed";
    } else {
      throw new Error("Product not found in cart");
    }
  }
}

abstract class Order {
  customer: Customer;
  products: Product[];
  totalPrice: number;

  constructor(customer: Customer, products: Product[]) {
    this.customer = customer;
    this.products = products;
    this.totalPrice = this.calculateTotalPrice();
  }

  abstract calculateTotalPrice(): number;
}

// Physical Order class
class PhysicalOrder extends Order {
  shippingAddress: string;
  deliveryDate: string;

  constructor(
    customer: Customer,
    products: Product[],
    shippingAddress: string,
    deliveryDate: string
  ) {
    super(customer, products);
    this.shippingAddress = shippingAddress;
    this.deliveryDate = deliveryDate;
  }

  calculateTotalPrice(): number {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price; // Multiply by quantity if needed
    });
    return total + 100; // Adding fixed shipping cost
  }
}

// Digital Order class
class DigitalOrder extends Order {
  calculateTotalPrice(): number {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price;
    });
    return total; // No shipping cost
  }
}

// Payment Abstract class
abstract class Payment {
  amount: number;
  order: Order;

  constructor(amount: number, order: Order) {
    this.amount = amount;
    this.order = order;
  }

  abstract processPayment(): string;
}

// Credit Card Payment class
class CreditCardPayment extends Payment {
  cardNumber: string;
  expirationDate: string;

  constructor(
    amount: number,
    order: Order,
    cardNumber: string,
    expirationDate: string
  ) {
    super(amount, order);
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }

  processPayment(): string {
    return "Payment processed using credit card";
  }
}

// PayPal Payment class
class PayPalPayment extends Payment {
  email: string;
  password: string;

  constructor(amount: number, order: Order, email: string, password: string) {
    super(amount, order);
    this.email = email;
    this.password = password;
  }

  processPayment(): string {
    return "Payment processed using PayPal";
  }
}

// Shipping Service Interface
interface ShippingService {
  shipOrder(order: Order): void;
}

// Courier Shipping class
class CourierShipping implements ShippingService {
  shipOrder(order: PhysicalOrder): void {
    const address = order.shippingAddress;
    console.log(`Shipping order to ${address}...`);
  }
}

// Email Delivery class
class EmailDelivery implements ShippingService {
  shipOrder(order: DigitalOrder): void {
    const email = order.customer.email;
    const products = order.products.map((product) => product.name).join(", ");
    console.log(
      `Delivering digital order to ${email} with products: ${products}`
    );
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
let order = new PhysicalOrder(
  customer,
  customer.cart,
  customer.address,
  "2024-09-15"
);
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
