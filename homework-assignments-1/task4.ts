class Product {
  name: string;
  price: number;
  stock: number;

  constructor(name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  addStock(quantity: number): void {
    this.stock += quantity;
  }

  reduceStock(quantity: number): void {
    if (this.stock - quantity >= 0) {
      this.stock -= quantity;
    } else {
      console.log("Not enough stock available.");
    }
  }
}

class Customer {
  name: string;
  email: string;
  cart: Product[];
  address: string;

  constructor(name: string, email: string, address: string) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.cart = [];
  }

  addProductToCart(product: Product): void {
    this.cart.push(product);
  }

  removeProductFromCart(product: Product): void {
    this.cart = this.cart.filter((item) => item.name !== product.name);
  }
}

abstract class Order {
  customer: Customer;
  products: Product[];
  totalPrice: number;

  abstract calculateTotalPrice(): number;
}

class PhysicalOrder extends Order {
  shippingAddress: string;
  deliveryDate: Date;

  constructor(
    customer: Customer,
    products: Product[],
    shippingAddress: string
  ) {
    super();
    this.shippingAddress = shippingAddress;
    this.deliveryDate = new Date();
  }

  calculateTotalPrice(): number {
    const shippingCost = 10;
    return (this.totalPrice =
      this.products.reduce((total, product) => total + product.price, 0) +
      shippingCost);
  }
}

class DigitalOrder extends Order {
  constructor(customer: Customer, products: Product[]) {
    super();
  }

  calculateTotalPrice(): number {
    return (this.totalPrice = this.products.reduce(
      (total, product) => total + product.price,
      0
    ));
  }
}

abstract class Payment {
  amount: number;
  order: Order;

  abstract processPayment(): void;
}

class CreditCardPayment extends Payment {
  cardNumber: string;
  expirationDate: Date;

  constructor(
    amount: number,
    order: Order,
    cardNumber: string,
    expirationDate: Date
  ) {
    super();
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }

  processPayment(): void {
    console.log("Processing payment with credit card on " + this.cardNumber);
  }
}

class PayPalPayment extends Payment {
  email: string;
  password: string;

  constructor(amount: number, order: Order, email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  processPayment(): void {
    console.log("Processing payment with PayPal on " + this.email);
  }
}

interface ShippingService {
  shipOrder(order: Order): void;
}

class CourierShipping implements ShippingService {
  shipOrder(order: Order): void {
    console.log("Shipping order with courier");
  }
}

class EmailDelivery implements ShippingService {
  shipOrder(order: Order): void {
    console.log("Sending order via email");
  }
}
