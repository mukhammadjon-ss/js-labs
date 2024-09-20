class Book {
  title: string;
  author: string;
  isbn: string;
  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Library {
  books: Book[];
  constructor() {
    this.books = [];
  }

  listBooks() {
    return this.books;
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  removeBook(isbn: string) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }
}
