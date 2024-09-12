class User {
  constructor(username, password) {
    this._username = username;
    this._password = password;
  }

  validateLogin(inputPassword) {
    return inputPassword === this._password
  }
}

const user = new User('Somename', 'Somepassword');

console.log(user.validateLogin('Somepassword'));