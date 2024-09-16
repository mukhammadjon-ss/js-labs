class Book {
    title: string;
    author: string;
    isbn: string;
    
    constructor (title: string, author: string, isbn: string) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Library {
    books: Book[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    removeBook(isbn: string) {
        return this.books.filter((book) => book.isbn !== isbn);
        
    }
}
