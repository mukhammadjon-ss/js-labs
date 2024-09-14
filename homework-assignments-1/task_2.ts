class User {
    private username: string;
    private password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    validateLogin(inputPassword:string): boolean {
        return this.password === inputPassword;
    }
}

const firstUser = new User('akilbel','akilbek2003');
//testing
console.log(firstUser.validateLogin('akilbek'));
console.log(firstUser.validateLogin('akilbek2003'));