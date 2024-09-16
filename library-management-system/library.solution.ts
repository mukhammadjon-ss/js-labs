abstract class LibraryItem {
  constructor(protected id: number) {}

  abstract getDetails(): string;
}

class Book extends LibraryItem {
  constructor(
    id: number,
    protected title: string,
    protected author: string,
    protected publishedDate: Date
  ) {
    super(id);
  }

  getDetails(): string {
    return `Book - ID: ${this.id}, Title: ${this.title}, Author: ${this.author}, Published Date: ${this.publishedDate}`;
  }
}

class FictionBook extends Book {
  constructor(
    id: number,
    title: string,
    author: string,
    publishedDate: Date,
    private genre: string
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `${super.getDetails()}, Fiction, Genre: ${this.genre}`;
  }
}

class NonFictionBook extends Book {
  constructor(
    id: number,
    title: string,
    author: string,
    publishedDate: Date,
    private category: string
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `${super.getDetails()}, Non-Fiction, Category: ${this.category}`;
  }
}

class ReferenceBook extends Book {
  constructor(id: number, title: string, author: string, publishedDate: Date) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `${super.getDetails()}, Reference Book`;
  }
}

class LibraryMember {
  private borrowedItems: LibraryItem[] = [];

  constructor(protected id: number, protected name: string) {}

  borrowItem(item: LibraryItem) {
    this.borrowedItems.push(item);
    console.log(`${this.name} borrowed ${item.getDetails()}`);
  }

  returnItem(item: LibraryItem) {
    this.borrowedItems = this.borrowedItems.filter(
      (borrowed) => borrowed !== item
    );
    console.log(`${this.name} returned ${item.getDetails()}`);
  }

  getBorrowedItems(): LibraryItem[] {
    return this.borrowedItems;
  }
}

class AdultMember extends LibraryMember {
  constructor(id: number, name: string) {
    super(id, name);
  }
}

class ChildMember extends LibraryMember {
  constructor(id: number, name: string) {
    super(id, name);
  }
}

class Loan {
  constructor(
    private member: LibraryMember,
    private item: LibraryItem,
    private loanDate: Date,
    private returnDate: Date | null = null
  ) {}

  returnItem(returnDate: Date) {
    this.returnDate = returnDate;
    console.log(
      `Item returned: ${this.item.getDetails()} by ${this.member.getBorrowedItems()}`
    );
  }

  getDetails(): string {
    return `Loan - Member: ${
      this.member
    }, Item: ${this.item.getDetails()}, Loan Date: ${
      this.loanDate
    }, Return Date: ${this.returnDate ? this.returnDate : "Not yet returned"}`;
  }
}

class Library<T extends LibraryItem> {
  private items: T[] = [];

  addItem(item: T) {
    this.items.push(item);
    console.log(`Added item: ${item.getDetails()}`);
  }

  getItemById(id: number): T | undefined {
    return this.items.find((item) => item["id"] === id);
  }

  listItems(): void {
    this.items.forEach((item) => {
      console.log(item.getDetails());
    });
  }
}

function processLibraryItems(items: LibraryItem[]) {
  items.forEach((item) => {
    console.log(item.getDetails());
  });
}
