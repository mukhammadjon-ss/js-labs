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
        if (stock === void 0) { stock = 0; }
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    Product.prototype.addStock = function (quantity) {
        this.stock += quantity;
        return 'Succesfully added!';
    };
    Product.prototype.reduceStock = function (quantity) {
        if (this.stock < quantity) {
            return 'There are no so much products in stock!';
        }
        this.stock -= quantity;
        return 'Succesfully reduced!';
    };
    return Product;
}());
var Customer = /** @class */ (function () {
    function Customer(name, email, address) {
        if (address === void 0) { address = 'SomeWhere'; }
        this.name = name;
        this.email = email;
        this.address = address;
        this.cart = [];
    }
    Customer.prototype.addToCart = function (product) {
        this.cart.push(product);
        return "Succesfully added ".concat(product.name, " to cart!");
    };
    Customer.prototype.removeFromCart = function (product) {
        var cartLen = this.cart.length;
        this.cart = this.cart.filter(function (item) { return item.name !== product.name; });
        if (cartLen > this.cart.length) {
            return "Succesfully removed ".concat(product.name, " from cart!");
        }
        else {
            return "There is no such product in your cart!";
        }
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
    function PhysicalOrder(customer, products, shippingAddress) {
        if (shippingAddress === void 0) { shippingAddress = 'SomeWhere'; }
        var _this = _super.call(this, customer, products) || this;
        _this.customer = customer;
        _this.products = products;
        _this.shippingAddress = shippingAddress;
        _this.deliveryDate = new Date();
        _this.shippingAddress = shippingAddress;
        return _this;
    }
    PhysicalOrder.prototype.calculateTotalPrice = function () {
        var shippingCost = 100; /// Shipping Cost
        this.totalPrice = this.products.reduce(function (acc, product) { return acc + product.price; }, 0) + shippingCost;
        return this.totalPrice;
    };
    return PhysicalOrder;
}(Order));
var DigitalOrder = /** @class */ (function (_super) {
    __extends(DigitalOrder, _super);
    function DigitalOrder(customer, products) {
        var _this = _super.call(this, customer, products) || this;
        _this.customer = customer;
        _this.products = products;
        return _this;
    }
    DigitalOrder.prototype.calculateTotalPrice = function () {
        this.totalPrice = this.products.reduce(function (acc, product) { return acc + product.price; }, 0);
        return this.totalPrice;
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
    function CreditCardPayment(amount, order, cardNumber, expirationDate) {
        var _this = _super.call(this, amount, order) || this;
        _this.amount = amount;
        _this.order = order;
        _this.cardNumber = cardNumber;
        _this.expirationDate = expirationDate;
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        return 'Order successfully paid by credit card';
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, order, email, password) {
        var _this = _super.call(this, amount, order) || this;
        _this.amount = amount;
        _this.order = order;
        _this.email = email;
        _this.password = password;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        return 'Order successfully paid with PayPal';
    };
    return PayPalPayment;
}(Payment));
var CourierShipping = /** @class */ (function () {
    function CourierShipping() {
    }
    CourierShipping.prototype.shipOrder = function (order) {
        console.log("Shipping order to ".concat(order.shippingAddress, ". Estimated delivery date: ").concat(order.deliveryDate));
    };
    return CourierShipping;
}());
var EmailDelivery = /** @class */ (function () {
    function EmailDelivery() {
    }
    EmailDelivery.prototype.shipOrder = function (order) {
        console.log("Sending digital order to ".concat(order.customer.email, "."));
    };
    return EmailDelivery;
}());
// Create a customer
var customer = new Customer("John Doe", "john@example.com", "123 Main St");
// Create products
var phone = new Product("Smartphone", 699, 10);
var ebook = new Product("Ebook", 29, 100);
// Add products to the cart
customer.addToCart(phone);
customer.addToCart(ebook);
// Create an order
var order = new PhysicalOrder(customer, customer.cart);
order.calculateTotalPrice();
// Process payment
var payment = new CreditCardPayment(order.totalPrice, order, "1234-5678-9876-5432", "12/25");
payment.processPayment();
// Ship the order
var shippingService = new CourierShipping();
shippingService.shipOrder(order);
