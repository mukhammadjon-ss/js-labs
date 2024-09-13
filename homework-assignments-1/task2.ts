class User {
  private username: string;
  private password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  validateLogin(inputPassword: string): boolean {
    return this.password === inputPassword;
  }
}

const user = new User("NizomiddinAzam", "qwerty1234");

console.log(user.validateLogin("qwerty1234"));
console.log(user.validateLogin("wrongPassword"));
