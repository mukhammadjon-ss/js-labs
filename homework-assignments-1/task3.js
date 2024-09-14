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
    }

    removeBook(isbn) {
        for (let i = 0; i < this.books.length; ++i) {
            if (this.books[i].isbn === isbn) {
                return this.books[i] && this.books.splice(i, 1);
            }
        }
    }
}

const lib = new Library();
const book1 = new Book("Godfather", "Mario Puzo", "9780099528128");
const book2 = new Book("The Hobbit", "J.R.R. Tolkien", "9780261102217");
lib.addBook(book1); // add book1
lib.addBook(book2); // add book2
lib.removeBook("9780261102217"); // return book2
