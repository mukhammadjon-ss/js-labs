class User {
  #_username: string;
  #_password: string;

  constructor(username: string, password: string) {
    this.#_username = username;
    this.#_password = password;
  }

  public validateLogin(inputPassword: string): boolean {
    return this.checkPassword(inputPassword);
  }

  private checkPassword(inputPassword: string): boolean {
    return inputPassword === this.#_password;
  }
}
