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
