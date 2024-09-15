class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Library{
    constructor(books){
        this.books = books;
    }

    
    addBook(book){
        const bookExists = this.books.find(b => b.isbn === book.isbn);
        if(book && !bookExists){
            this.books.push(book);
            console.log('Book successfully added to the library.');
        } else{
            console.log("Book already exists in the library");
        }
    };

    removeBook(isbn){
        this.books = this.books.filter(book => book.isbn !== isbn);
        console.log("Book successfully removed.");
        return this.books;
    }
};


const arrayOfBooks = [];

const goneWithTheWind = new Book("Gone With The Wind", "Margaret Mitchell", "9780140814910");
const janeEyre = new Book("Jane Eyre", "Charlotte Bronte", "9780393043426");
const lib = new Library(arrayOfBooks);

lib.addBook(goneWithTheWind);
lib.addBook(janeEyre);

console.log(arrayOfBooks);

lib.removeBook("9780393043426");
console.log(lib.removeBook("9780140814910"));
