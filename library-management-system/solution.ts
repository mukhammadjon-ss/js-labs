abstract class LibraryItem {
  constructor(public id: string) {}

  abstract getDetails(): string;
}

class Book extends LibraryItem {
  constructor(
    id: string,
    public title: string,
    public author: string,
    public publishedDate: Date,
  ) {
    super(id);
  }

  getDetails(): string {
    return `Book title ${this.title}, author ${this.author}, published date ${this.publishedDate}`;
  }
}

class FictionBook extends Book {
  constructor(
    public genre: string,
    id: string,
    title: string,
    author: string,
    publishedDate: Date,
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `Book title ${this.title}, author ${this.author}, published date ${this.publishedDate}, Genre ${this.genre}`;
  }
}

class NonFictionBook extends Book {
  constructor(
    public category: string,
    id: string,
    title: string,
    author: string,
    publishedDate: Date,
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `Book title ${this.title}, author ${this.author}, published date ${this.publishedDate}, Genre ${this.category}`;
  }
}

class ReferenceBook extends Book {
  constructor(id: string, title: string, author: string, publishedDate: Date) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `Book title ${this.title}, author ${this.author}, published date ${this.publishedDate}, Book Type = Reference book`;
  }
}

abstract class LibraryMember {
  borrowedItems: LibraryItem[];
  fee: number;

  constructor(
    public id: number,
    public name: string,
  ) {
    this.borrowedItems = [];
    this.fee = 0;
  }

  abstract borrowItem(item: LibraryItem): void;
  abstract returnItem(item: LibraryItem): void;
}

class AdultMember extends LibraryMember {
  borrowCost: number;

  constructor(id: number, name: string) {
    super(id, name);
    this.borrowCost = 20;
  }

  borrowItem(item: LibraryItem): void {
    this.borrowedItems.push(item);
    this.fee += this.borrowCost;
  }

  returnItem(item: LibraryItem): void {
    this.borrowedItems.filter((borrowedItem) => borrowedItem !== item);
  }
}

class ChildMember extends LibraryMember {
  borrowCost: number;

  constructor(id: number, name: string) {
    super(id, name);
    this.borrowCost = 10;
  }

  borrowItem(item: LibraryItem): void {
    this.borrowedItems.push(item);
    this.fee += this.borrowCost;
  }

  returnItem(item: LibraryItem): void {
    this.borrowedItems.filter((borrowedItem) => borrowedItem !== item);
  }
}

class Loan {
  loanDate: Date;
  returnDate: Date | null;

  constructor(
    public member: LibraryMember,
    public item: LibraryItem,
  ) {
    this.loanDate = new Date();
    this.returnDate = null;
  }

  returnItem(): void {
    this.returnDate = new Date();
  }
}

class Library<T extends LibraryItem> {
  items: T[];

  constructor() {
    this.items = [];
  }

  addItem(item: T) {
    this.items.push(item);
  }

  retrieveItem(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

function processLibraryItems(items: LibraryItem[]): void {
  items.forEach((item) => {
    console.log(item.getDetails());
  });
}
