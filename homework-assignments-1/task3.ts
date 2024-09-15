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
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(isbn: string): void {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  listBooks(): void {
    this.books.forEach((book) => {
      console.log(
        `Title: ${book.title}, Author: ${book.author}, ISBN: ${book.isbn}`
      );
    });
  }
}

const library = new Library();

const book1 = new Book("Sherlock Holms", "Arthur Conan Doyel", "wer23456");
const book2 = new Book("IT", "Stiven King", "qwerty34567");
const book3 = new Book("Mine Kampf)))", "Adolf H", "1122334455");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

console.log("Books in the library:");
library.listBooks();

library.removeBook("1122334455");

console.log("\n Books in the library after removal:");
library.listBooks();
