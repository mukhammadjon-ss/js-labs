class User {
    #password = "helloworld123";

    constructor(){
       this._username = "John Doe";
    }


    validateLogin(inputPassword) {
        if (this.#password === inputPassword) {
            return true;
        }
        return false;
    }
}

const user = new User();
console.log(user.validateLogin("helloworld123")); // true
console.log(user.validateLogin("123helloworld")); // false
// console.log(user.#password); // Error


