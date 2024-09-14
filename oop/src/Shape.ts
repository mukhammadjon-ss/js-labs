abstract class Shape {
  abstract area(): number;

  public describe(): void {
    console.log(`Area of the shape is ${this.area()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  public area(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
// console.log(circle.area()) //
circle.describe(); // 3.14 * 25

const rectangle = new Rectangle(4, 7);
rectangle.describe();

interface MultiFunctionPrinter {
  print(): void;
  scan(): void;
}

interface printerInterface {
  print(): void;
}

class Printer implements MultiFunctionPrinter {
  print(): void {}

  scan(): void {}
}

// Notification.ts
interface INotification {
  send(message: string): void;
}

// EmailNotification.ts
class EmailNotification implements INotification {
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
class SMSNotification implements INotification {
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
  private notification: INotification;

  constructor(notification: INotification) {
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
