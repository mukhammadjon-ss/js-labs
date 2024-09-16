class Product {
  constructor(
    public name: string,
    public price: number,
    public stock: number
  ) {}

  addStock(quantity: number): void {
    this.stock += quantity;
  }

  reduceStock(quantity: number): void {
    if (this.stock >= quantity) {
      this.stock -= quantity;
    } else {
      console.log(`Not enough stock for ${this.name}`);
    }
  }
}

class Customer {
  public cart: Product[] = [];

  constructor(
    public name: string,
    public email: string,
    public address: string
  ) {}

  addToCart(product: Product): void {
    this.cart.push(product);
    console.log(`${product.name} added to cart`);
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter((p) => p !== product);
    console.log(`${product.name} removed from cart`);
  }
}

abstract class Order {
  public totalPrice: number = 0;

  constructor(public customer: Customer, public products: Product[]) {}

  abstract calculateTotalPrice(): void;
}
class PhysicalOrder extends Order {
  public shippingAddress: string;
  public deliveryDate: Date;

  constructor(
    customer: Customer,
    products: Product[],
    shippingAddress: string
  ) {
    super(customer, products);
    this.shippingAddress = shippingAddress;
    this.deliveryDate = new Date();
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 7); // Estimate delivery in 7 days
  }

  calculateTotalPrice(): void {
    const productTotal = this.products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    const shippingCost = 10; // Flat shipping rate
    this.totalPrice = productTotal + shippingCost;
  }
}
class DigitalOrder extends Order {
  calculateTotalPrice(): void {
    this.totalPrice = this.products.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }
}
abstract class Payment {
  constructor(public amount: number, public order: Order) {}

  abstract processPayment(): void;
}
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
interface ShippingService {
  shipOrder(order: Order): void;
}
class CourierShipping implements ShippingService {
  shipOrder(order: Order): void {
    if (order instanceof PhysicalOrder) {
      console.log(`Shipping order to ${order.shippingAddress}`);
    } else {
      console.log("This service is for physical orders only.");
    }
  }
}
class EmailDelivery implements ShippingService {
  shipOrder(order: Order): void {
    if (order instanceof DigitalOrder) {
      console.log(`Sending digital order to ${order.customer.email}`);
    } else {
      console.log("This service is for digital orders only.");
    }
  }
}

const customer = new Customer(
  "Nizomiddin Azam",
  "azamnizomiddin@gmail.com",
  "Farobiy 16"
);

const phone = new Product("Smartphone", 699, 10);
const ebook = new Product("Ebook", 29, 100);

customer.addToCart(phone);
customer.addToCart(ebook);

let physicalOrder = new PhysicalOrder(
  customer,
  customer.cart,
  customer.address
);
physicalOrder.calculateTotalPrice();
console.log(`Total price for physical order: $${physicalOrder.totalPrice}`);

let creditCardPayment = new CreditCardPayment(
  physicalOrder.totalPrice,
  physicalOrder,
  "1234-5678-9876-5432",
  "12/25"
);
creditCardPayment.processPayment();

let courierShipping = new CourierShipping();
courierShipping.shipOrder(physicalOrder);

let digitalOrder = new DigitalOrder(customer, [ebook]);
digitalOrder.calculateTotalPrice();
console.log(`Total price for digital order: $${digitalOrder.totalPrice}`);

let paypalPayment = new PayPalPayment(
  digitalOrder.totalPrice,
  digitalOrder,
  "azamnizomiddin@gmail.com",
  "password123"
);
paypalPayment.processPayment();

let emailDelivery = new EmailDelivery();
emailDelivery.shipOrder(digitalOrder);
