abstract class LibraryItem{
    id: number;
    constructor(id:number){
        this.id = id;
    }
    abstract getDetails():string;
}

class Book extends LibraryItem{
    title:string;
    author:string;
    publishDate:string;
    quantity:number
    constructor(id:number,title:string,author:string,publishDate:string,quantity:number) {
        super(id);
        this.title = title;
        this.author = author;
        this.publishDate = publishDate;
        this.quantity = quantity;
    }
    getDetails(): string {
        return `Book ${this.id}, Title: ${this.title}, Author: ${this.author}, Publish Date: ${this.publishDate}, Quantity: ${this.quantity}`;
    }
    decrementQuantity(): void {
        if (this.quantity > 0) {
            this.quantity--;
        } else {
            console.log("No more copies available to borrow.");
        }
    }

    incrementQuantity(): void {
        this.quantity++;
    }
}
class FictionBook extends Book{
    constructor(id:number,title:string,author:string,publishDate:string,quantity:number,public genre:string) {
        super(id,title,author,publishDate,quantity);
        this.genre = genre
    }
    getDetails(): string {
        return `${super.getDetails()}, Genre: ${this.genre}`;
    }
}
class NonFictionBook extends Book{
    constructor(id:number,title:string,author:string,publishDate:string,quantity:number,public category:string) {
        super(id,title,author,publishDate,quantity);
        this.category = category
    }
    getDetails(): string {
        return `${super.getDetails()}, Genre: ${this.category}`;
    }
}
class ReferenceBook  extends Book{
    constructor(id:number,title:string,author:string,publishDate:string,quantity:number) {
        super(id,title,author,publishDate,quantity);
    }
    getDetails(): string {
        return `Reference Book ${super.getDetails()}`;
    }
}

class Loan {
    constructor(public member: LibraryMember, public item: LibraryItem, public loanDate: Date = new Date(), public returnDate: Date | null = null) {}
    returnItem(): void {
        this.returnDate = new Date();
    }
}
class LibraryMember{
    private loans: Loan[] = [];
    constructor(public id:number, public name:string){}

    borrowItem(item: Book):void{
        if (item.quantity > 0) {
            item.decrementQuantity();
            const loan = new Loan(this, item);
            this.loans.push(loan);
            console.log(`${this.name} borrowed ${item.getDetails()}`);
        } else {
            console.log(`Sorry, ${item.title} is not available.`);
        }
    }

    returnItem(item:Book): void {
        this.loans = this.loans.filter(loan => loan.item.id !== item.id);
        item.incrementQuantity(); // Increment quantity when returned
        console.log(`${this.name} returned ${item.getDetails()}`);
    }
}
class AdultMember extends LibraryMember{}
class ChildMember extends LibraryMember{}

class Library<T extends LibraryItem>{
    private items:T[] =[];

    addItem(item:T){
        this.items.push(item);
        console.log(`${item.getDetails()}. Items added to the library.`);
    }

    retrieveItem(id: number): T | undefined {
        const filteredItems = this.items.filter(item => item.id === id);
        return filteredItems.length > 0 ? filteredItems[0] : undefined;
    }

    printItems():void{
        this.items.forEach(item=>{console.log(item.getDetails())});
    }
}
function processLibraryItems(items: LibraryItem[]): void {
    items.forEach((item) => {
        console.log(item.getDetails());
    });
}
//testing

const library = new Library<Book>();

const book1 = new FictionBook(1, 'Dune', 'Frank Herbert', '1965', 2,'Science Fiction');
const book2 = new NonFictionBook(2, 'Sapiens', 'Yuval Noah Harari', '2014', 3,'History');
const book3 = new ReferenceBook(3, 'Encyclopedia', 'Various', '2000',4);
library.addItem(book1);
library.addItem(book2);
library.addItem(book3);
const adult = new AdultMember(1, 'John Doe');
const child = new ChildMember(2,'Aki');
child.borrowItem(book2)
adult.borrowItem(book1);
library.printItems();