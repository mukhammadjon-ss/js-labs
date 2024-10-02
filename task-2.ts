class User {
  constructor(private username: string, private password: string) {
    this.username = username;
    this.password = password;
  }

  private validateLogin(inputPassword: string) {
    if (inputPassword !== this.password) return false;
    return true;
  }
}
