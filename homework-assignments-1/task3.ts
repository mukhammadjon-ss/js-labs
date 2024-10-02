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
    console.log(`'${book.title}' by ${book.author} added to the library.`);
  }

  removeBook(isbn: string): void {
    const index = this.books.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
      const removedBook = this.books.splice(index, 1)[0];
      console.log(`'${removedBook.title}' by ${removedBook.author} removed from the library.`);
    } else {
      console.log(`Book with ISBN ${isbn} not found in the library.`);
    }
  }
}