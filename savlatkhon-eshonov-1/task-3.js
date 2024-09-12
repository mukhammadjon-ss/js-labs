class Library {
  constructor(books) {
    this.books = books || []
  }

  addBook(book){
    if (book.title && book.author && book.isbn) {
      this.books.push(book)
    } else {
      return false
    }
  }

  removeBook(isbn){
    this.books = this.books.filter(val => val.isbn !== isbn)
  }
}

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const book1 = new Book('Harry Potter', 'Joan Rowling', 1);
const book2 = new Book('Pharaoh', 'Boleslav Prus', 2);
const book3 = new Book('1.9.8.4', 'George Orwell', 3);

const library = new Library([book1, book2])

library.addBook(book3);
// console.log(library.books);
library.removeBook(3);
console.log(library.books);
