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
const circle = new Circle(5);
circle.describe();

const rectangle = new Rectangle(4, 7);
rectangle.describe();
```

# Single Responsibility Principle (SRP) Example in TypeScript

The Single Responsibility Principle (SRP) is one of the SOLID principles of object-oriented design. It states that a class should have only one reason to change, meaning it should only have one responsibility or job.

## Example: User Management System

In this example, we'll demonstrate how to apply the Single Responsibility Principle by designing a User Management System. We'll separate responsibilities into different classes: one for handling user data, another for user notifications, and a third for user authentication.

### 1. Define a `User` Class

The `User` class will handle user data management.

```typescript
// User.ts
class User {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}

// UserNotification.ts
class UserNotification {
  sendWelcomeEmail(user: User): void {
    console.log(`Sending welcome email to ${user.getUsername()}`);
    // Add logic to send email
  }

  sendPasswordResetEmail(user: User): void {
    console.log(`Sending password reset email to ${user.getUsername()}`);
    // Add logic to send email
  }
}

// UserAuthenticator.ts
class UserAuthenticator {
  authenticate(user: User, password: string): boolean {
    // Here you would add logic to check the password
    if (user.getPassword() === password) {
      console.log(`User ${user.getUsername()} authenticated successfully.`);
      return true;
    } else {
      console.log(`Authentication failed for user ${user.getUsername()}.`);
      return false;
    }
  }
}

// main.ts
const user = new User("john_doe", "securepassword123");
const userNotification = new UserNotification();
const userAuthenticator = new UserAuthenticator();

// Send a welcome email
userNotification.sendWelcomeEmail(user);

// Authenticate user
const isAuthenticated = userAuthenticator.authenticate(
  user,
  "securepassword123"
);

if (isAuthenticated) {
  console.log("User is authenticated");
} else {
  console.log("User is not authenticated");
}
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


// main.ts
const creditCardPayment = new CreditCardPayment(100, '4111111111111111', '12/25');
const payPalPayment = new PayPalPayment(50, 'john.doe@example.com', 'password123');

const creditCardProcessor = new PaymentProcessor(creditCardPayment);
const payPalProcessor = new PaymentProcessor(payPalPayment);

creditCardProcessor.process();
payPalProcessor.process();
```

# Liskov Substitution Principle (LSP) Example in TypeScript

The Liskov Substitution Principle (LSP) is one of the SOLID principles of object-oriented design. It states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. In other words, subclasses should extend the behavior of a superclass without changing its expected behavior.

## Example: Shape Area Calculation

In this example, we'll demonstrate how to apply the Liskov Substitution Principle by designing a system for calculating areas of different shapes. We'll use an abstract base class `Shape` and create concrete subclasses `Rectangle` and `Circle` that adhere to the principle.

### 1. Define an Abstract Class `Shape`

Create an abstract class `Shape` with an abstract method `calculateArea`.

```typescript
// Shape.ts
abstract class Shape {
  abstract calculateArea(): number;
}
// Rectangle.ts
class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

// Circle.ts
class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// main.ts
const rectangle = new Rectangle(5, 10);
const circle = new Circle(7);

function printArea(shape: Shape) {
  console.log(`The area of the shape is: ${shape.calculateArea()}`);
}

printArea(rectangle); // Output: The area of the shape is: 50
printArea(circle); // Output: The area of the shape is: 153.93804002589985
```

# Interface Segregation Principle (ISP) Example in TypeScript

The Interface Segregation Principle (ISP) is one of the SOLID principles of object-oriented design. It states that no client should be forced to depend on methods it does not use. This principle emphasizes the need for creating specific interfaces for different functionalities rather than a large, general-purpose interface.

## Example: Printing and Scanning Devices

In this example, we'll demonstrate how to apply the Interface Segregation Principle by designing a system for different types of devices: printers and scanners. We'll define separate interfaces for printing and scanning functionalities and ensure that each device only implements the interfaces it needs.

### 1. Define Specific Interfaces

Create interfaces for printing and scanning functionalities.

```typescript
// PrintInterface.ts
interface PrintInterface {
  print(document: string): void;
}

// ScanInterface.ts
interface ScanInterface {
  scan(document: string): void;
}

// Printer.ts
class Printer implements PrintInterface {
  print(document: string): void {
    console.log(`Printing document: ${document}`);
    // Add logic to print document
  }
}

// Scanner.ts
class Scanner implements ScanInterface {
  scan(document: string): void {
    console.log(`Scanning document: ${document}`);
    // Add logic to scan document
  }
}

// MultiFunctionPrinter.ts
class MultiFunctionPrinter implements PrintInterface, ScanInterface {
  print(document: string): void {
    console.log(`Printing document: ${document}`);
    // Add logic to print document
  }

  scan(document: string): void {
    console.log(`Scanning document: ${document}`);
    // Add logic to scan document
  }
}

// main.ts
const printer = new Printer();
const scanner = new Scanner();
const multiFunctionPrinter = new MultiFunctionPrinter();

printer.print("Document1.pdf");
scanner.scan("Document2.pdf");
multiFunctionPrinter.print("Document3.pdf");
multiFunctionPrinter.scan("Document4.pdf");
```

# Dependency Inversion Principle (DIP) Example in TypeScript

The Dependency Inversion Principle (DIP) is one of the SOLID principles of object-oriented design. It states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions. Furthermore, abstractions should not depend on details. Details should depend on abstractions. This principle helps in achieving loose coupling between components.

## Example: Notification System

In this example, we'll demonstrate how to apply the Dependency Inversion Principle by designing a notification system. We'll define an interface for notifications and create concrete implementations for different types of notifications. We'll use dependency injection to ensure that high-level modules depend on abstractions rather than concrete implementations.

### 1. Define a `Notification` Interface

Create an interface that defines the contract for notifications.

```typescript
// Notification.ts
interface Notification {
  send(message: string): void;
}

// EmailNotification.ts
class EmailNotification implements Notification {
  private emailAddress: string;

  constructor(emailAddress: string) {
    this.emailAddress = emailAddress;
  }

  send(message: string): void {
    console.log(
      `Sending email to ${this.emailAddress} with message: ${message}`
    );
    // Add logic to send email
  }
}

// SMSNotification.ts
class SMSNotification implements Notification {
  private phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  send(message: string): void {
    console.log(`Sending SMS to ${this.phoneNumber} with message: ${message}`);
    // Add logic to send SMS
  }
}

// UserService.ts
class UserService {
  private notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  notifyUser(message: string): void {
    this.notification.send(message);
  }
}

// main.ts
const emailNotification = new EmailNotification("user@example.com");
const smsNotification = new SMSNotification("123-456-7890");

const userServiceWithEmail = new UserService(emailNotification);
const userServiceWithSMS = new UserService(smsNotification);

userServiceWithEmail.notifyUser("Welcome to our service!");
userServiceWithSMS.notifyUser("Your verification code is 123456");
```
