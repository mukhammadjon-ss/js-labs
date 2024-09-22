abstract class LibraryItem {
  constructor(public id: number) {}

  abstract getDetails(): string;
}

abstract class Book extends LibraryItem {
  constructor(
    id: number,
    public title: string,
    public author: string,
    public publishedDate: Date
  ) {
    super(id);
    this.title = title;
    this.author = author;
    this.publishedDate = new Date();
  }

  filledBookInfo(): boolean {
    return !!this.title && !!this.author && !!this.publishedDate;
  }
}

class FictionBook extends Book {
  constructor(id: number, title: string, author: string, publishedDate: Date) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `Fiction Book: ${this.title} by ${this.author}`;
  }
}

class NonFictionBook extends Book {
  constructor(id: number, title: string, author: string, publishedDate: Date) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `Non-Fiction Book: ${this.title} by ${this.author}`;
  }
}

class ReferenceBook extends Book {
  constructor(id: number, title: string, author: string, publishedDate: Date) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `Reference Book: ${this.title} by ${this.author}`;
  }
}

abstract class LibraryMember {
  constructor(
    public id: number,
    public name: string,
    protected borrowedItems: LibraryItem[] = []
  ) {
    this.id = Math.random();
    this.name = name;
  }

  abstract borrowItem(book: Book): void;
  abstract returnBook(book: Book): void;

  getBorrowedItems(): LibraryItem[] {
    return this.borrowedItems;
  }

  // canBorrow(bookId: number): boolean {
  //   console.log(bookId);
  //   return this.books.findIndex(({ id }) => id === bookId) < 0;
  // }
}

class Student extends LibraryMember {
  constructor(id: number, name: string) {
    super(id, name, []);
  }

  borrowItem(item: LibraryItem): void {
    this.borrowedItems.push(item);
    console.log(`${this.name} borrowed: ${item.getDetails()}`);
  }

  returnBook(book: Book): void {}
}

class Library<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItems(): T[] {
    return this.items;
  }
}

// Create library instance
const library = new Library<Book>();

// Create books
const fictionBook = new FictionBook(
  1,
  "Dune",
  "Frank Herbert",
  new Date("1965-08-01")
);
const nonFictionBook = new NonFictionBook(
  2,
  "Sapiens",
  "Yuval Noah Harari",
  new Date("2011-01-01")
);

// Add books to library
library.addItem(fictionBook);
library.addItem(nonFictionBook);

// Create members
const adultMember = new Student(1, "John Doe");

// Members borrow items
adultMember.borrowItem(fictionBook);

// Print borrowed items
console.log(
  "Adult Member's Borrowed Items:",
  adultMember.getBorrowedItems().map((item) => item.getDetails())
);
