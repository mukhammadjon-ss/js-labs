class User {
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }

    validateLogin(inputPassword) {
        return inputPassword == this._password;
    }
}

const usr1 = new User("electronicTiger", "mySeCrEtPa$$wrd");
console.log(usr1.validateLogin("12345678")); // false
