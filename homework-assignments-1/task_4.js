var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(name, price, stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    Product.prototype.addStock = function (quantity) {
        this.stock += quantity;
        console.log("".concat(quantity, " items added. New stock: ").concat(this.stock));
    };
    ;
    Product.prototype.removeStock = function (quantity) {
        this.stock -= quantity;
        console.log("".concat(quantity, " items removed. New stock: ").concat(this.stock));
    };
    return Product;
}());
var Customer = /** @class */ (function () {
    function Customer(name, email, address) {
        this.name = name;
        this.email = email;
        this.cart = [];
        this.address = address;
    }
    Customer.prototype.addToCart = function (product) {
        this.cart.push(product);
    };
    Customer.prototype.removeFromCart = function (product) {
        this.cart = this.cart.filter(function (p) { return p !== product; });
    };
    return Customer;
}());
var Order = /** @class */ (function () {
    function Order(customer, products) {
        this.customer = customer;
        this.products = products;
        this.totalPrice = 0;
    }
    return Order;
}());
var PhysicalOrder = /** @class */ (function (_super) {
    __extends(PhysicalOrder, _super);
    function PhysicalOrder(customer, products, shippingAddress, deliveryDate) {
        var _this = _super.call(this, customer, products) || this;
        _this.shippingAddress = shippingAddress;
        _this.deliveryDate = deliveryDate;
        return _this;
    }
    PhysicalOrder.prototype.calculateTotalPrice = function () {
        var productTotal = this.products.reduce(function (total, product) { return total + product.price; }, 0);
        var shippingCost = 10;
        return productTotal + shippingCost;
    };
    return PhysicalOrder;
}(Order));
var DigitalOrder = /** @class */ (function (_super) {
    __extends(DigitalOrder, _super);
    function DigitalOrder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DigitalOrder.prototype.calculateTotalPrice = function () {
        return this.products.reduce(function (total, product) { return total + product.price; }, 0);
    };
    return DigitalOrder;
}(Order));
var Payment = /** @class */ (function () {
    function Payment(amount, order) {
        this.amount = amount;
        this.order = order;
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(cardNumber, expirationDate, amount, order) {
        var _this = _super.call(this, order, amount) || this;
        _this.cardNumber = cardNumber;
        _this.expirationDate = expirationDate;
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        console.log("The payment is processing by ".concat(this.amount, " amount for order..."));
    };
    return CreditCardPayment;
}(Payment));
var PayPal = /** @class */ (function (_super) {
    __extends(PayPal, _super);
    function PayPal(email, amount, password, order) {
        var _this = _super.call(this, amount, order) || this;
        _this.email = email;
        _this.password = password;
        return _this;
    }
    PayPal.prototype.processPayment = function () {
        console.log("The payment is processing by Paypal for ".concat(this.amount, " amount for order..."));
    };
    return PayPal;
}(Payment));
var CourierShipping = /** @class */ (function () {
    function CourierShipping() {
    }
    CourierShipping.prototype.shipOrder = function (order) {
        console.log("Shipping order is to address ".concat(order.shippingAddress, " time ").concat(order.deliveryDate, "."));
    };
    return CourierShipping;
}());
var EmailDelivery = /** @class */ (function () {
    function EmailDelivery() {
    }
    EmailDelivery.prototype.shipOrder = function (order) {
        console.log("Shipping delivered by email address ".concat(order.customer.email, "."));
    };
    return EmailDelivery;
}());
// Create some products
var product1 = new Product('Laptop', 1200, 10);
var product2 = new Product('Smartphone', 800, 20);
// Create a customer
var customer = new Customer('John Doe', 'john.doe@example.com', '123 Main St, City');
// Customer adds products to the cart
customer.addToCart(product1);
customer.addToCart(product2);
// Create a physical order (shipping required)
var physicalOrder = new PhysicalOrder(customer, customer.cart, customer.address, '2024-09-20');
var totalPhysicalPrice = physicalOrder.calculateTotalPrice();
console.log("Total price for physical order: $".concat(totalPhysicalPrice));
// Create a digital order (no shipping required)
var digitalOrder = new DigitalOrder(customer, customer.cart);
var totalDigitalPrice = digitalOrder.calculateTotalPrice();
console.log("Total price for digital order: $".concat(totalDigitalPrice));
// Process payment with Credit Card for the physical order
var creditCardPayment = new CreditCardPayment('1234-5678-9876-5432', '12/25', totalPhysicalPrice, physicalOrder.totalPrice);
creditCardPayment.processPayment();
// Process payment with PayPal for the digital order
var paypalPayment = new PayPal('john.doe@example.com', totalDigitalPrice, 'securepassword', digitalOrder.totalPrice);
paypalPayment.processPayment();
// Ship the physical order using courier
var courierShipping = new CourierShipping();
courierShipping.shipOrder(physicalOrder);
// Deliver the digital order via email
var emailDelivery = new EmailDelivery();
emailDelivery.shipOrder(physicalOrder); // Note: This should ideally be a digital order
