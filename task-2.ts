class User {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  validateLogin(inputPassword: string) {
    return this._password === inputPassword;
  }
}

const user_1 = new User("Elon Musk", "XÆA-12");
const user_2 = new User("Gabe Newell", "halflife3");
console.log(user_1.validateLogin("XAE-12"));
console.log(user_1.validateLogin("wtf-did-he-name-his-son"));
console.log(user_1.validateLogin("XÆA-12"));
console.log(user_2.validateLogin("halflife3"));
console.log(user_1.validateLogin("fat-gaben"));
