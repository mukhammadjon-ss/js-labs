class Library {
  public books: Book[];

  constructor() {
    this.books = [];
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  removeBook(isbn: Book["isbn"]) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }
}

class Book {
  public title: string;
  public author: string;
  public isbn: number;

  constructor(title: string, author: string, isbn: number) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
