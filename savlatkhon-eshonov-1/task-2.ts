class User {
  _username:string;
  _password:string;
  constructor(username:string, password:string) {
    this._username = username;
    this._password = password;
  }

  validateLogin(inputPassword:string) {
    return inputPassword === this._password
  }
}

const user = new User('Somename', 'Somepassword');

console.log(user.validateLogin('Somepassword'));