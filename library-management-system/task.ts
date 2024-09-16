abstract class LibraryItem {
  constructor(public id: string) {}

  abstract getDetails(): string;
}

class Book extends LibraryItem {
  constructor(
    id: string,
    public title: string,
    public author: string,
    public publishedDate: string
  ) {
    super(id);
  }

  getDetails(): string {
    return `Book: ${this.title}, Author: ${this.author}, Published: ${this.publishedDate}`;
  }
}

class FictionBook extends Book {
  constructor(
    id: string,
    title: string,
    author: string,
    publishedDate: string,
    public genre: string
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `${super.getDetails()}, Genre: ${this.genre}`;
  }
}

class NonFictionBook extends Book {
  constructor(
    id: string,
    title: string,
    author: string,
    publishedDate: string,
    public category: string
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `${super.getDetails()}, Category: ${this.category}`;
  }
}

class ReferenceBook extends Book {
  constructor(
    id: string,
    title: string,
    author: string,
    publishedDate: string
  ) {
    super(id, title, author, publishedDate);
  }

  getDetails(): string {
    return `${super.getDetails()} (Reference Book -Cann't be borrowed)`;
  }
}

class LibraryMember {
  public borrowedItems: LibraryItem[] = [];

  constructor(public id: string, public name: string) {}

  borrowItem(item: LibraryItem) {
    this.borrowedItems.push(item);
    console.log(`${this.name} borrowed ${item.getDetails()}`);
  }

  returnItem(item: LibraryItem) {
    const index = this.borrowedItems.indexOf(item);
    if (index > -1) {
      this.borrowedItems.splice(index, 1);
      console.log(`${this.name} returned ${item.getDetails()}`);
    }
  }
}

class AdultMember extends LibraryMember {
  constructor(id: string, name: string) {
    super(id, name);
  }
}
class ChildMember extends LibraryMember {
  constructor(id: string, name: string) {
    super(id, name);
  }
}

class Loan {
  constructor(
    public member: LibraryMember,
    public item: LibraryItem,
    public loanDate: Date,
    public returnDate: Date | null = null
  ) {}

  returnBook(date: Date) {
    this.returnDate = date;
  }
}

class Library<T extends LibraryItem> {
  private items: T[] = [];

  addItem(item: T) {
    this.items.push(item);
  }

  getItemById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

function processLibraryItems(items: LibraryItem[]): void {
  items.forEach((item) => {
    console.log(item.getDetails());
  });
}

const library = new Library<Book>();

const book1 = new FictionBook(
  "1",
  "Sherlock Holmes",
  "Arthur Conan Doyel",
  "2024",
  "Detective"
);
const book2 = new NonFictionBook(
  "2",
  "Mein Kampf",
  "Adolf Hitler",
  "1939",
  "History)))"
);
const book3 = new ReferenceBook("3", "Otgan Kunlar", "Abdulla Qodiriy", "1969");

library.addItem(book1);
library.addItem(book2);
library.addItem(book3);

const adultMember = new AdultMember("1", "Nizomiddin Azam");
const childMember = new ChildMember("2", "Alisher Ruziev");

adultMember.borrowItem(book1);
childMember.borrowItem(book2);
adultMember.returnItem(book1);

processLibraryItems(library.getAllItems());
