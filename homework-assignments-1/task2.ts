class User {
  #_username: string;
  #_password: string;

  constructor(username: string, password: string) {
    this.#_username = username;
    this.#_password = password;
  }

  validateLogin(inputPassword: string) {
    return this.#_password === inputPassword;
  }
}
