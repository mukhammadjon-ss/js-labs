### ** TASK 1 **

#### Task: Implement Shape, Circle, and Rectangle Classes

Create an abstract class `Shape` that defines an abstract method `calculateArea()`. Then, implement two subclasses `Circle` and `Rectangle` that inherit from `Shape` and provide concrete implementations for the `calculateArea()` method.

---

#### Requirements:

1. **Abstract Class**:

   - Create an abstract class `Shape` with an abstract method `calculateArea()`.
   - The `Shape` class should not be instantiated directly.

2. **Inheritance**:
   - Create two subclasses, `Circle` and `Rectangle`, that inherit from `Shape`.
   - Each subclass must implement the `calculateArea()` method based on the type of shape.
     - `Circle` will calculate area using the formula `π * radius^2`.
     - `Rectangle` will calculate area using the formula `length * width`.

---

#### Class Breakdown:

- **Abstract Class Shape**:
  - Abstract method `calculateArea()`: This method should be implemented in the subclasses.
- **Circle Class**:

  - **Properties**: `radius` (number).
  - Implements `calculateArea()`: Calculates the area using `π * radius^2`.

- **Rectangle Class**:
  - **Properties**: `length` (number), `width` (number).
  - Implements `calculateArea()`: Calculates the area using `length * width`.

---

### ** TASK 2 **

#### Task: User Authentication System

Create a `User` class that encapsulates the private properties `username` and `password`. Implement a method `validateLogin()` to abstract the process of validating user credentials.

---

#### Requirements:

1. **Encapsulation**:

   - Keep the `username` and `password` properties private.
   - The password should not be accessible or modifiable directly from outside the class.

2. **Abstraction**:
   - Implement a method `validateLogin(inputPassword)` that abstracts the logic for checking if the provided password matches the user’s actual password.
   - The login validation process should be handled internally by the method without exposing the details of how passwords are compared.

---

#### Class Breakdown:

- **Properties**:
  - `username`: The username of the user (private).
  - `password`: The password of the user (private).
- **Methods**:
  - `validateLogin(inputPassword)`: Checks if the provided `inputPassword` matches the stored password. Return `true` if valid, `false` otherwise.

### **TASK 3**

#### Task: Library and Book Classes

Create a `Library` class that maintains a collection of `Book` objects. Each `Book` object should have properties like `title`, `author`, and `isbn`. Implement methods to add and remove books from the library's collection.

---

#### Requirements:

1. **Class Structure**:

   - Create a `Book` class with the properties `title`, `author`, and `isbn`.
   - Create a `Library` class that contains an array of `Book` objects.

2. **Association**:
   - The `Library` class will be associated with multiple `Book` objects (one-to-many association).
   - A `Library` should be able to add and remove `Book` objects.

---

#### Class Breakdown:

- **Book Class**:
  - **Properties**:
    - `title`: The title of the book.
    - `author`: The author of the book.
    - `isbn`: The ISBN of the book.
- **Library Class**:
  - **Properties**:
    - `books`: An array that stores multiple `Book` objects.
  - **Methods**:
    - `addBook(book)`: Adds a `Book` object to the `books` array.
    - `removeBook(isbn)`: Removes a book from the library by matching the `isbn`.

---

## ** TASK 4 (Optional) **

## Task Overview

You will build a simplified e-commerce system that includes several interconnected classes such as products, customers, orders, and payments. You will need to apply OOP principles to structure the relationships between these classes effectively.

### 1. **Product Class**

Create a `Product` class that encapsulates the details of a product.

- **Properties**:
  - `name`: Name of the product.
  - `price`: Price of the product.
  - `stock`: Number of items available.
- **Methods**:
  - `addStock(quantity)`: Adds a specific quantity to the stock.
  - `reduceStock(quantity)`: Reduces a specific quantity from the stock, ensuring stock doesn’t go below zero.

### 2. **Customer Class**

Create a `Customer` class to represent a customer and their cart.

- **Properties**:
  - `name`: Customer’s name.
  - `email`: Customer’s email.
  - `cart`: Array of `Product` objects representing the customer’s cart.
  - `address`: Customer's shipping address.
- **Methods**:
  - `addToCart(product)`: Adds a product to the cart.
  - `removeFromCart(product)`: Removes a product from the cart.

### 3. **Order Abstract Class**

Define an abstract class `Order` to represent a general order.

- **Properties**:
  - `customer`: The customer who placed the order.
  - `products`: Array of products in the order.
  - `totalPrice`: The total cost of the order.
- **Abstract Method**:
  - `calculateTotalPrice()`: Abstract method to be implemented by subclasses.

### 4. **PhysicalOrder Class (Inheritance)**

Create a subclass `PhysicalOrder` that inherits from `Order`.

- **Additional Properties**:
  - `shippingAddress`: The address to ship the order to.
  - `deliveryDate`: Estimated delivery date.
- **Methods**:
  - Implements `calculateTotalPrice()` by calculating the total price of the products and adding a shipping cost.

### 5. **DigitalOrder Class (Inheritance)**

Create a subclass `DigitalOrder` that inherits from `Order`.

- **Methods**:
  - Implements `calculateTotalPrice()` but does not include shipping costs.

### 6. **Payment Abstract Class**

Define an abstract class `Payment` to represent a general payment.

- **Properties**:
  - `amount`: The payment amount.
  - `order`: The associated order.
- **Abstract Method**:
  - `processPayment()`: Abstract method to be implemented by subclasses for processing payment.

### 7. **CreditCardPayment Class (Polymorphism)**

Create a subclass `CreditCardPayment` that inherits from `Payment`.

- **Additional Properties**:
  - `cardNumber`: Credit card number.
  - `expirationDate`: Expiry date of the card.
- **Methods**:
  - Implements `processPayment()` to simulate credit card payment.

### 8. **PayPalPayment Class (Polymorphism)**

Create a subclass `PayPalPayment` that inherits from `Payment`.

- **Additional Properties**:
  - `email`: PayPal account email.
  - `password`: PayPal account password.
- **Methods**:
  - Implements `processPayment()` to simulate PayPal payment.

### 9. **ShippingService Interface**

Define an interface `ShippingService` that represents a shipping service.

- **Method**:
  - `shipOrder(order)`: Ships the given order.

### 10. **CourierShipping Class (Interface Implementation)**

Create a class `CourierShipping` that implements the `ShippingService` interface.

- **Methods**:
  - Implements `shipOrder()` to simulate the shipment of a physical order.

### 11. **EmailDelivery Class (Interface Implementation)**

Create a class `EmailDelivery` that implements the `ShippingService` interface.

- **Methods**:
  - Implements `shipOrder()` to simulate sending a digital order via email.

---

## Example Usage

Here is an example of how to use these classes:

```javascript
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
```
