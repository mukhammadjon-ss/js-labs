var Book = /** @class */ (function () {
    function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    Book.prototype.getTitle = function () {
        return this.title;
    };
    Book.prototype.getAuthor = function () {
        return this.author;
    };
    Book.prototype.getIsbn = function () {
        return this.isbn;
    };
    return Book;
}());
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
        console.log("Book by \"".concat(book.title, "\" title name was added."));
    };
    Library.prototype.removeBook = function (isbn) {
        var initialLength = this.books.length;
        this.books = this.books.filter(function (book) { return book.getIsbn() !== isbn; });
        if (initialLength > this.books.length) {
            console.log("Book by \"".concat(isbn, "\" isbn is removed"));
        }
        else {
            console.log("Not found book by \"".concat(isbn, "\" isbn."));
        }
    };
    Library.prototype.listOfBooks = function () {
        if (this.books.length == 0) {
            console.log("Books not found");
        }
        else {
            console.log("List of books:");
            this.books.forEach(function (book) {
                console.log("".concat(book.title, " by ").concat(book.author, " with ISBN-").concat(book.isbn));
            });
        }
    };
    return Library;
}());
var library = new Library();
var book1 = new Book('Life of Aki', 'Mirza', '1');
var book2 = new Book('Life of Jack', 'Shoxa', '12');
var book3 = new Book('Life of Miro', 'Amal', '123');
//adding new books
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
// list of current books
library.listOfBooks();
// removing book
library.removeBook('1');
// new list
library.listOfBooks();
//we can get seperate info about book
console.log(book3.getTitle());
console.log(book1.getAuthor());
