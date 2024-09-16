class Book {
  constructor(
    public title: string,
    public author: string,
    public isbn: number
  ) {}
}

class Library {
  constructor(private _bookshelf: Array<Book> = []) {}

  listBooks() {
    return this._bookshelf;
  }

  addBook(newBook: Book) {
    this._bookshelf.push(newBook);
  }

  removeBook(book: Book) {
    const indexOfBook = this._bookshelf.indexOf(book);
    this._bookshelf.splice(indexOfBook, 1);
  }
}

const book_1 = new Book("1984", "George Orwell", 9781443434973);
const book_2 = new Book("Ikki eshik orasi", "O'tkir Hoshimov", 9789943267817);
const book_3 = new Book(
  "The Return of the King",
  "John Ronald Reuel Tolkien",
  9780812698060
);

const myLibrary = new Library([book_2]);
console.log(myLibrary.listBooks());

myLibrary.addBook(book_1);
myLibrary.addBook(book_3);
console.log(myLibrary.listBooks());

myLibrary.removeBook(book_1);
console.log(myLibrary.listBooks());
