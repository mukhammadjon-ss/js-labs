// interface NotificationManager {
//   send(message: string): void;
// }

// class EmailNotification implements NotificationManager {
//   constructor(private email: string) {}

//   send(message: string): void {
//     console.log("Sending email: ", message);
//   }
// }

// class SMSNotification implements NotificationManager {
//   private phoneNumber: string;
//   constructor(number: string) {
//     this.phoneNumber = number;
//   }

//   send(message: string): void {
//     console.log("Sending sms: ", message, " to number ", this.phoneNumber);
//   }
// }

// const emailNotification = new EmailNotification("example@example.com");
// emailNotification.send("Your order has been shipped.");

// const smsNotification = new SMSNotification("123-456-7890");
// smsNotification.send("Your package is out for delivery.");
