class Product {
  public name: string;
  public price: number;
  public stock: number;

  constructor(name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  addStock(quantity: number) {
    this.stock += quantity;
  }

  reduceStock(quantity: number): void | never {
    if (quantity > this.stock) {
      throw new Error("Not sufficient stock");
    }

    this.stock -= quantity;
  }
}

class Customer {
  public name: string;
  public email: string;
  public cart: Product[];
  public address: string;

  constructor(name: string, email: string, address: string) {
    this.name = name;
    this.email = email;
    this.address = address;

    this.cart = [];
  }

  addToCart(product: Product) {
    this.cart.push(product);
  }

  removeFromCart(product: Product) {
    this.cart.filter(({ name }) => name !== product.name);
  }
}

abstract class Order {
  public customer: Customer;
  public products: Product[];
  public totalPrice: number;

  constructor(customer: Customer, products: Product[]) {
    this.customer = customer;
    this.products = products;
    this.totalPrice = 0;
  }

  abstract calculateTotalPrice(): void;
}

class PhysicalOrder extends Order {
  public shippingAddress: string;
  public shippingCost: number;
  public deliveryDate: Date;

  constructor(
    customer: Customer,
    products: Product[],
    shippingAddress: string,
    deliveryDate: Date,
  ) {
    super(customer, products);
    this.shippingCost = 50;
    this.shippingAddress = shippingAddress;
    this.deliveryDate = deliveryDate;
  }

  calculateTotalPrice() {
    this.totalPrice =
      this.shippingCost +
      this.products.reduce((acc, product) => acc + product.price, 0);
  }
}

class DigitalOrder extends Order {
  constructor(customer: Customer, products: Product[]) {
    super(customer, products);
  }

  calculateTotalPrice(): number {
    this.totalPrice = this.products.reduce(
      (acc, product) => acc + product.price,
      0,
    );

    return this.totalPrice;
  }
}

abstract class Payment {
  public amount: number;
  public order: Order;

  constructor(amount: number, order: Order) {
    this.amount = amount;
    this.order = order;
  }

  abstract processPayment(): void;
}

class CreditCardPayment extends Payment {
  public cardNumber: string;
  public expirationDate: string;

  constructor(
    orderTotalPrice: number,
    order: Order,
    cardNumber: string,
    expirationDate: string,
  ) {
    super(orderTotalPrice, order);
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }

  processPayment(): void {
    console.log("Processing credit cart payment");
  }
}

class PaypalPayment extends Payment {
  public email: string;
  public password: string;

  constructor(
    orderTotalPrice: number,
    order: Order,
    email: string,
    password: string,
  ) {
    super(orderTotalPrice, order);
    this.email = email;
    this.password = password;
  }

  processPayment(): void {
    console.log("Processing credit cart payment");
  }
}

interface ShippingService {
  shipOrder(order: Order): void;
}

class CourierShipping implements ShippingService {
  shipOrder(order: PhysicalOrder): void {
    console.log("Courier shipping...");
  }
}

class EmailDelivery implements ShippingService {
  shipOrder(order: DigitalOrder): void {
    console.log("Email delivery...");
  }
}

// Example usage
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
  "454 Indian Summer St.Osseo, MN 55311",
  new Date(2025, 1),
);
order.calculateTotalPrice();

// Process payment
let payment = new CreditCardPayment(
  order.totalPrice,
  order,
  "1234-5678-9876-5432",
  "12/25",
);
payment.processPayment();

// Ship the order
let shippingService = new CourierShipping();
shippingService.shipOrder(order);
