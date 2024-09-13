class Library {
  constructor(public books: Book[]) {
    this.books = books;
  }

  add(newBook: Book) {
    if ("author" in newBook && "isbn" in newBook && "title" in newBook) {
      this.books.push(newBook);
    }
  }

  remove(isbn: string) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }
}

class Book {
  constructor(
    public title: string,
    public author: string,
    public isbn: string
  ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
