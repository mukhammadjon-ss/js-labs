
class Shape {
    calculateArea() {
        throw new Error('You must implement the calculateArea method');
    }
}
  
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2); 
    }
}
  
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
    calculateArea() {
        return this.length * this.width; 
    }
}
  
const circle = new Circle(5);
console.log(`Circle area: ${circle.calculateArea()}`); 

const rectangle = new Rectangle(4, 6);
console.log(`Rectangle area: ${rectangle.calculateArea()}`);


// task 2

class User {
    #username;
    #password;

    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    validateLogin(inputPassword) {
        return inputPassword === this.#password;
    }

    getUsername() {
        return this.#username;
    }
}

const user = new User("Anna", "anna45321");

console.log(user.validateLogin("anna45321"));
console.log(user.validateLogin("anna45323")); 

console.log(user.username);
console.log(user.password);


//task 3

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        console.log(`Book titled "${book.title}" by ${book.author} added to the library.`);
    }

    removeBook(isbn) {
        const bookIndex = this.books.findIndex(book => book.isbn === isbn);
        if (bookIndex !== -1) {
        const removedBook = this.books.splice(bookIndex, 1)[0];
        console.log(`Book titled "${removedBook.title}" by ${removedBook.author} removed from the library.`);
        } else {
        console.log(`No book found with ISBN: ${isbn}`);
        }
    }

    displayBooks() {
        console.log("Library Collection:");
            if (this.books.length === 0) {
        console.log("No books in the library.");
        } else {
            this.books.forEach((book, index) => {
                console.log(`${index + 1}. Title: ${book.title}, Author: ${book.author}, ISBN: ${book.isbn}`);
            });
        }
    }
}
  const library = new Library();
  const book1 = new Book("example one", "author one", "12");
  const book2 = new Book("example two", "author two", "13");
  const book3 = new Book("example three", "author three", "14");
  library.addBook(book1);
  library.addBook(book2);
  library.addBook(book3);
  library.displayBooks();
  library.removeBook("987654321");
  library.displayBooks();