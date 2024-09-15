abstract class LibraryItem {
    constructor(private itemId: number) { };
    public getDetails(): void {
        console.log(`Library item id is ${this.itemId}`);
    }
}

class GeneralBooks {
    constructor(public title: string, public author: string, public publishedDate: string) { }

}

class FictionBook extends GeneralBooks {
    constructor(public title: string, public author: string, public publishedDate: string) {
        super(title, author, publishedDate);
    }
}

class NonFictionBook extends GeneralBooks {
    constructor(public title: string, public author: string, public publishedDate: string) {
        super(title, author, publishedDate);
    }
}

class ReferenceBook extends GeneralBooks {
    constructor(public title: string, public author: string, public publishedDate: string) {
        super(title, author, publishedDate);
    }
}

class LoanABook {
    constructor(public memberId: number, public name: string, public book: GeneralBooks, public loanDate: string, public returnDate: string) { }
}

abstract class LibraryMember {
    constructor(public memberId: number, public name: string) { }
    protected loanedBooks: LoanABook[] = [];

    abstract borrowBooks(book: GeneralBooks, period: number): void 
    
    public returnBooks(memberId: number, book: GeneralBooks): void {
        const currentDate = new Date().toDateString();
        this.loanedBooks.filter(loan =>
            loan.returnDate === currentDate
                ?
                !(loan.memberId === memberId && loan.book === book)
                :
                console.log("Late book return!")
        )
    };
};

class AdultMember extends LibraryMember {
    constructor(public memberId: number, public name: string) {
        super(memberId, name);
    }
    protected loanedBooks: LoanABook[] = [];

    public borrowBooks(book: GeneralBooks, period: number): void {
        const loanDate = new Date().toDateString();
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + period);

        const registerLoan = new LoanABook(this.memberId, this.name, book, loanDate, returnDate.toDateString());
        this.loanedBooks.push(registerLoan);

        console.log(`${this.name} has successfully borrowed "${book.title}" for ${period} days. Return day is ${returnDate.toDateString()}`);
    };
}

class ChildMember extends LibraryMember {
    constructor(public memberId: number, public name: string) {
        super(memberId, name);
    }
    protected loanedBooks: LoanABook[] = [];

    public borrowBooks(book: GeneralBooks, period: number): void {
        const loanDate = new Date().toDateString();
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + period);

        if(!(book instanceof FictionBook)){
            const registerLoan = new LoanABook(this.memberId, this.name, book, loanDate, returnDate.toDateString());
            this.loanedBooks.push(registerLoan);
            console.log(`${this.name} has successfully borrowed "${book.title}" for ${period} days. Return day is ${returnDate.toDateString()}`);
        } else {
            console.log("Children cannot borrow a fiction books.");
        }
    }
};


const fictionBook = new FictionBook("Gone with the Wind", "Margaret Mitchell", "1936");
const nonFictionBook = new NonFictionBook("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "2014");

const adultMember = new AdultMember(0o1, "Aziza");
const childMember = new ChildMember(0o2, "Rose");
adultMember.borrowBooks(fictionBook, 5);
childMember.borrowBooks(nonFictionBook, 7);
childMember.borrowBooks(fictionBook, 7);
