interface Product {
  name: string;
  price: number;
  stock: number
}

interface Customer {
  name:string;
  email:string;
  address:string;
}

interface ShippingService {
  shipOrder(order: Order): void;
}

class Product {
  constructor(
    public name:string,
    public price:number,
    public stock:number = 0
  ) {}

  addStock(quantity:number):string {
    this.stock += quantity;
    return 'Succesfully added!'
  }

  reduceStock(quantity:number):string {
    if (this.stock < quantity) {
      return 'There are no so much products in stock!'
    }
    this.stock -= quantity;
    return 'Succesfully reduced!'
  }
}

class Customer {
  public cart:Product[] = [];
  constructor(
    public name:string,
    public email:string,
    public address:string = 'SomeWhere'
  ) {}

  addToCart(product:Product):string {
    this.cart.push(product)
    return `Succesfully added ${product.name} to cart!`
  }

  removeFromCart(product:Product):string {
    let cartLen = this.cart.length
    this.cart = this.cart.filter(item => item.name !== product.name)
    if (cartLen > this.cart.length) {
      return `Succesfully removed ${product.name} from cart!`
    } else {
      return `There is no such product in your cart!`
    }
  }
}

abstract class Order {
  public totalPrice:number = 0;

  constructor(
    public customer:Customer,
    public products:Product[]
  ){}

  abstract calculateTotalPrice():number;
}

class PhysicalOrder extends Order {
  deliveryDate:Date = new Date();
  constructor(
    public customer:Customer,
    public products:Product[],
    public shippingAddress:string = 'SomeWhere'
  ){
    super(customer, products);
    this.shippingAddress = shippingAddress;
  }

  calculateTotalPrice():number {
    const shippingCost:number = 100;   /// Shipping Cost
    this.totalPrice = this.products.reduce((acc, product) => acc + product.price, 0) + shippingCost
    return this.totalPrice
  }
}

class DigitalOrder extends Order {
  constructor(
    public customer:Customer,
    public products:Product[],
  ){
    super(customer, products);
  }

  calculateTotalPrice():number {
    this.totalPrice = this.products.reduce((acc, product) => acc + product.price, 0);
    return this.totalPrice;
  }
}

abstract class Payment {
  constructor(
    public amount:number,
    public order:Order
  ) {}

  abstract processPayment():string;
}

class CreditCardPayment extends Payment {
  constructor(
    public amount:number,
    public order:Order,
    private cardNumber:string,
    private expirationDate:string
  ){
    super(amount, order)
  }

  processPayment():string {
    return 'Order successfully paid by credit card'
  }
}

class PayPalPayment extends Payment {
  constructor(
    public amount:number,
    public order:Order,
    private email:string,
    private password:string
  ){
    super(amount, order)
  }

  processPayment():string{
    return 'Order successfully paid with PayPal'
  }
}

class CourierShipping implements ShippingService {
  shipOrder(order: PhysicalOrder): void {
    console.log(`Shipping order to ${order.shippingAddress}. Estimated delivery date: ${order.deliveryDate}`);
  }
}

class EmailDelivery implements ShippingService {
  shipOrder(order: DigitalOrder): void {
    console.log(`Sending digital order to ${order.customer.email}.`);
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