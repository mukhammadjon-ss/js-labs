# Generics Task: Create a Generic Data Storage Class

## Objective

Implement a generic class in TypeScript that can store and manage a collection of items of any type. The class should provide methods for adding, retrieving, and removing items.

## Instructions

1. **Create a Generic Class `Storage<T>`:**

   - The class should use a generic type `T` to handle different types of items.

2. **Add Properties and Methods:**

   - **Property:**
     - `items`: An array to hold items of type `T`.
   - **Methods:**
     - `addItem(item: T): void`: Adds an item to the `items` array.
     - `getItem(index: number): T | undefined`: Retrieves an item by its index. If the index is out of bounds, return `undefined`.
     - `removeItem(index: number): void`: Removes an item by its index.
     - `getAllItems(): T[]`: Returns all items in the storage.

3. **Create a Few Instances:**
   - Instantiate the `Storage` class with different types (e.g., `number`, `string`) and demonstrate the usage of the methods.

## Example Usage

```typescript
// Example with numbers:
const numberStorage = new Storage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getAllItems()); // [1, 2]
console.log(numberStorage.getItem(0)); // 1
numberStorage.removeItem(0);
console.log(numberStorage.getAllItems()); // [2]

// Example with strings:
const stringStorage = new Storage<string>();
stringStorage.addItem("Hello");
stringStorage.addItem("World");
console.log(stringStorage.getAllItems()); // ['Hello', 'World']
console.log(stringStorage.getItem(1)); // 'World'
stringStorage.removeItem(1);
console.log(stringStorage.getAllItems()); // ['Hello']
```

# Practical Tasks for Interfaces and Abstract Classes

## Task 1: Interfaces

### **Objective:**

Design and implement an interface for a notification system. Create classes that implement this interface to send different types of notifications (e.g., email, SMS).

### **Instructions:**

1. **Define the Interface `Notification`:**

   - Include a method `send(message: string): void` that should be implemented by all classes.

2. **Implement Classes:**

   - **EmailNotification:** Implements `Notification` to send an email.
   - **SMSNotification:** Implements `Notification` to send an SMS.

3. **Create Instances and Test:**
   - Instantiate both classes and call their `send` methods with sample messages.

### **Example:**

```typescript
// Create instances and test
const emailNotification = new EmailNotification("example@example.com");
emailNotification.send("Your order has been shipped.");

const smsNotification = new SMSNotification("123-456-7890");
smsNotification.send("Your package is out for delivery.");
```

# Task 2: Abstract Classes

## **Objective:**

Create an abstract class representing a basic shape and extend it to implement specific shapes like circles and rectangles.

## **Instructions:**

### 1. Define the Abstract Class `Shape`:

- **Abstract Method:**

  - `area(): number` - This method should be abstract, meaning that it must be implemented by any subclass of `Shape`.

- **Concrete Method:**
  - `describe()` - This method should provide a description of the shape by calling the `area()` method and returning the area in a formatted string.

### 2. Implement Subclasses:

- **Circle:**

  - Extend the `Shape` class.
  - Implement the `area()` method to calculate the area of a circle using the formula: `π * radius^2`.

- **Rectangle:**
  - Extend the `Shape` class.
  - Implement the `area()` method to calculate the area of a rectangle using the formula: `width * height`.

### 3. Create Instances and Test:

- Instantiate both the `Circle` and `Rectangle` classes with sample values.
- Call the `area` and `describe` methods on each instance and verify the output.

## **Example:**

```typescript
// Create instances and test
const circle = new Circle(5);
circle.describe(); // Output: The area of this shape is 78.53981633974483 square units.

const rectangle = new Rectangle(4, 7);
rectangle.describe(); // Output: The area of this shape is 28 square units.
```

# Open/Closed Principle (OCP) Example in TypeScript

The Open/Closed Principle (OCP) is one of the SOLID principles of object-oriented design. It states that a class should be open for extension but closed for modification. This means you should be able to extend a class's behavior without changing its existing code.

## Example: Payment Processing System

In this example, we'll demonstrate how to apply the Open/Closed Principle using a payment processing system. We'll define an abstract class for payment methods and create concrete implementations for different types of payments. Our payment processor will be able to handle any payment method without modification.

### 1. Define an Abstract Class `PaymentMethod`

Create an abstract class that defines the common behavior for all payment methods.

```typescript
// PaymentMethod.ts
abstract class PaymentMethod {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  // Abstract method to be implemented by subclasses
  abstract processPayment(): void;
}

// CreditCardPayment.ts
class CreditCardPayment extends PaymentMethod {
  private cardNumber: string;
  private expirationDate: string;

  constructor(amount: number, cardNumber: string, expirationDate: string) {
    super(amount);
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }

  processPayment(): void {
    console.log(
      `Processing credit card payment of $${this.amount} using card: ${this.cardNumber}`
    );
    // Add logic for credit card payment
  }
}

// PayPalPayment.ts
class PayPalPayment extends PaymentMethod {
  private email: string;
  private password: string;

  constructor(amount: number, email: string, password: string) {
    super(amount);
    this.email = email;
    this.password = password;
  }

  processPayment(): void {
    console.log(
      `Processing PayPal payment of $${this.amount} using email: ${this.email}`
  }
}

// CreditCardPayment.ts
class CreditCardPayment extends PaymentMethod {
  private cardNumber: string;
  private expirationDate: string;

  constructor(amount: number, cardNumber: string, expirationDate: string) {
    super(amount);
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
  }

  processPayment(): void {
    console.log(`Processing credit card payment of $${this.amount} using card: ${this.cardNumber}`);
    // Add logic for credit card payment
  }
}

// PayPalPayment.ts
class PayPalPayment extends PaymentMethod {
  private email: string;
  private password: string;

  constructor(amount: number, email: string, password: string) {
    super(amount);
    this.email = email;
    this.password = password;
  }

  processPayment(): void {
    console.log(`Processing PayPal payment of $${this.amount} using email: ${this.email}`);
    // Add logic for PayPal payment
  }
}


// main.ts
const creditCardPayment = new CreditCardPayment(100, '4111111111111111', '12/25');
const payPalPayment = new PayPalPayment(50, 'john.doe@example.com', 'password123');

const creditCardProcessor = new PaymentProcessor(creditCardPayment);
const payPalProcessor = new PaymentProcessor(payPalPayment);

creditCardProcessor.process();
payPalProcessor.process();


```
