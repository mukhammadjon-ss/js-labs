class User {
    private username: string;
    private password: string;
  
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
  
    // Public method to validate login, abstracts password checking logic
    validateLogin(inputPassword: string): boolean {
      return this.password === inputPassword;
    }
}    