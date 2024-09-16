// class Storag<T> {
//   private items: T[] = [];

//   public addItem(item: T): void {
//     this.items.push(item);
//   }

//   public getItem(index: number): T | undefined {
//     return this.items[index];
//   }

//   public removeItem(index: number): void {
//     if (index >= 0 && index < this.items.length) {
//       this.items.splice(index, 1);
//     }
//   }

//   public getAllItems(): T[] {
//     return this.items;
//   }
// }

// const numberStorage = new Storag<number>();
// numberStorage.addItem(1);
// numberStorage.addItem(2);
// console.log(numberStorage.getAllItems()); // Output: [1, 2]
// console.log(numberStorage.getItem(0)); // Output: 1
// numberStorage.removeItem(0);
// console.log(numberStorage.getAllItems()); // Output: [2]

// // Example usage with strings
// const stringStorage = new Storag<string>();
// stringStorage.addItem("Hello");
// stringStorage.addItem("World");
// console.log(stringStorage.getAllItems()); // Output: ['Hello', 'World']
// console.log(stringStorage.getItem(1)); // Output: 'World'
// stringStorage.removeItem(1);
// console.log(stringStorage.getAllItems()); // Output: ['Hello']

interface NotificationManager {
  send(message: string): void;
}

class EmailNotification implements NotificationManager {
  private emailAddress: string;

  constructor(emailAddress: string) {
    this.emailAddress = emailAddress;
  }

  public send(message: string): void {
    console.log("Sending email to" + this.emailAddress);
  }
}

class SMSNotification implements NotificationManager {
  private phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  public send(message: string): void {
    console.log(`Sending SMS to ${this.phoneNumber}`);
    console.log(`Message: ${message}`);
  }
}

const emailNotification = new EmailNotification("example@example.com");
emailNotification.send("Your order has been shipped.");

const smsNotification = new SMSNotification("123-456-7890");
smsNotification.send("Your package is out for delivery.");
