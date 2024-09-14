var User = /** @class */ (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    User.prototype.validateLogin = function (inputPassword) {
        return this.password === inputPassword;
    };
    return User;
}());
var firstUser = new User('akilbel', 'akilbek2003');
//testing
console.log(firstUser.validateLogin('akilbek'));
console.log(firstUser.validateLogin('akilbek2003'));
