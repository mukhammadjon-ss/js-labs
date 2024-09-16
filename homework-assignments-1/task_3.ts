class Book {
    title: string;
    author: string;
    isbn: string;

    constructor(title: string, author: string, isbn: string) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    getTitle():string{
        return this.title;
    }
    getAuthor():string{
        return this.author;
    }
    getIsbn():string{
        return this.isbn;
    }
}


class Library {
    private books : Book[] = []


    addBook(book:Book):void{
        this.books.push(book);
        console.log(`Book by "${book.title}" title name was added.`);
    }
    removeBook(isbn:string):void{
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.getIsbn() !== isbn);
        if(initialLength > this.books.length){
            console.log(`Book by "${isbn}" isbn is removed`);
        }else{
            console.log(`Not found book by "${isbn}" isbn.`);
        }
    }

    listOfBooks():void{
        if(this.books.length == 0){
            console.log("Books not found");
        }else{
            console.log("List of books:");
            this.books.forEach((book) => {
                console.log(`${book.title} by ${book.author} with ISBN-${book.isbn}`);
            })
        }
    }
}

const library = new Library()

const book1 = new Book('Life of Aki','Mirza','1');
const book2 = new Book('Life of Jack','Shoxa','12');
const book3 = new Book('Life of Miro','Amal','123');

//adding new books
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
// list of current books
library.listOfBooks()
// removing book
library.removeBook('1')
// new list
library.listOfBooks()
//we can get seperate info about book
console.log(book3.getTitle())
console.log(book1.getAuthor())