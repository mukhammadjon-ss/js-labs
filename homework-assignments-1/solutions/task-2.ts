class User {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validateLogin(inputPassword: string) {
    return inputPassword === this.password;
  }
}
