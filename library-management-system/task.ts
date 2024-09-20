abstract class LibraryItem {
  id: number;

  abstract getDetails(): string;
}

class Book extends LibraryItem {
  title: string;
  author: string;
  publishedDate: Date;

  constructor(id: number, title: string, author: string, publishedDate: Date) {
    super();
    this.title = title;
    this.author = author;
    this.publishedDate = publishedDate;
  }

  getDetails(): string {
    return `Book: ${this.title} by ${this.author}`;
  }
}

class FictionBook extends Book {
  genre: string;

  constructor(
    id: number,
    title: string,
    author: string,
    publishedDate: Date,
    genre: string
  ) {
    super(id, title, author, publishedDate);
    this.genre = genre;
  }

  getDetails(): string {
    return `Fiction Book: ${this.title} by ${this.author}`;
  }
}

class NonFictionBook extends Book {
  genre: string;

  constructor(
    id: number,
    title: string,
    author: string,
    publishedDate: Date,
    genre: string
  ) {
    super(id, title, author, publishedDate);
    this.genre = genre;
  }

  getDetails(): string {
    return `NonFictionBook Book: ${this.title} by ${this.author}`;
  }
}

class ReferenceBook extends Book {
  genre: string;

  constructor(
    id: number,
    title: string,
    author: string,
    publishedDate: Date,
    genre: string
  ) {
    super(id, title, author, publishedDate);
    this.genre = genre;
  }

  getDetails(): string {
    return `ReferenceBook Book: ${this.title} by ${this.author}`;
  }
}

class LibraryMember {
  id: number;
  name: string;
  items: LibraryItem[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  borrowItem(item: LibraryItem) {
    this.items.push(item);
  }

  returnItem(item: LibraryItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getBorrowedItems(): string {
    return this.items.map((item) => item.getDetails()).join("\n");
  }
}

class AdultMember extends LibraryMember {
  constructor(id: number, name: string, age: number) {
    super(id, name);
  }
}

class ChildMember extends LibraryMember {
  constructor(id: number, name: string, age: number) {
    super(id, name);
  }
}

class Loan {
  member: LibraryMember;
  item: LibraryItem;
  loanDate: Date;
  returnDate?: Date;

  constructor(member: LibraryMember, item: LibraryItem, loanDate: Date) {
    this.member = member;
    this.item = item;
    this.loanDate = loanDate;
  }

  returnItem(returnDate: Date): void {
    this.returnDate = returnDate;
  }

  getLoanDetails(): string {
    return (
      `Loan: ${this.item.getDetails()} borrowed by ${
        this.member.name
      } on ${this.loanDate.toDateString()}` +
      (this.returnDate ? `, returned on ${this.returnDate.toDateString()}` : "")
    );
  }
}

class Library<T> {
  items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItems(): T[] {
    return this.items;
  }
}

function processLibraryItems(items: LibraryItem[]): void {
  items.forEach((item) => {
    console.log(item.getDetails());
  });
}
