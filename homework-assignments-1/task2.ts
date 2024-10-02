class User {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  validateLogin(password: string): boolean {
    return password === this.password;
  }
}

