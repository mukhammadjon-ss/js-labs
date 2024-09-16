var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LibraryItem = /** @class */ (function () {
    function LibraryItem(id) {
        this.id = id;
    }
    return LibraryItem;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(id, title, author, publishDate, quantity) {
        var _this = _super.call(this, id) || this;
        _this.title = title;
        _this.author = author;
        _this.publishDate = publishDate;
        _this.quantity = quantity;
        return _this;
    }
    Book.prototype.getDetails = function () {
        return "Book ".concat(this.id, ", Title: ").concat(this.title, ", Author: ").concat(this.author, ", Publish Date: ").concat(this.publishDate, ", Quantity: ").concat(this.quantity);
    };
    Book.prototype.decrementQuantity = function () {
        if (this.quantity > 0) {
            this.quantity--;
        }
        else {
            console.log("No more copies available to borrow.");
        }
    };
    Book.prototype.incrementQuantity = function () {
        this.quantity++;
    };
    return Book;
}(LibraryItem));
var FictionBook = /** @class */ (function (_super) {
    __extends(FictionBook, _super);
    function FictionBook(id, title, author, publishDate, quantity, genre) {
        var _this = _super.call(this, id, title, author, publishDate, quantity) || this;
        _this.genre = genre;
        _this.genre = genre;
        return _this;
    }
    FictionBook.prototype.getDetails = function () {
        return "".concat(_super.prototype.getDetails.call(this), ", Genre: ").concat(this.genre);
    };
    return FictionBook;
}(Book));
var NonFictionBook = /** @class */ (function (_super) {
    __extends(NonFictionBook, _super);
    function NonFictionBook(id, title, author, publishDate, quantity, category) {
        var _this = _super.call(this, id, title, author, publishDate, quantity) || this;
        _this.category = category;
        _this.category = category;
        return _this;
    }
    NonFictionBook.prototype.getDetails = function () {
        return "".concat(_super.prototype.getDetails.call(this), ", Genre: ").concat(this.category);
    };
    return NonFictionBook;
}(Book));
var ReferenceBook = /** @class */ (function (_super) {
    __extends(ReferenceBook, _super);
    function ReferenceBook(id, title, author, publishDate, quantity) {
        return _super.call(this, id, title, author, publishDate, quantity) || this;
    }
    ReferenceBook.prototype.getDetails = function () {
        return "Reference Book ".concat(_super.prototype.getDetails.call(this));
    };
    return ReferenceBook;
}(Book));
var Loan = /** @class */ (function () {
    function Loan(member, item, loanDate, returnDate) {
        if (loanDate === void 0) { loanDate = new Date(); }
        if (returnDate === void 0) { returnDate = null; }
        this.member = member;
        this.item = item;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }
    Loan.prototype.returnItem = function () {
        this.returnDate = new Date();
    };
    return Loan;
}());
var LibraryMember = /** @class */ (function () {
    function LibraryMember(id, name) {
        this.id = id;
        this.name = name;
        this.loans = [];
    }
    LibraryMember.prototype.borrowItem = function (item) {
        if (item.quantity > 0) {
            item.decrementQuantity();
            var loan = new Loan(this, item);
            this.loans.push(loan);
            console.log("".concat(this.name, " borrowed ").concat(item.getDetails()));
        }
        else {
            console.log("Sorry, ".concat(item.title, " is not available."));
        }
    };
    LibraryMember.prototype.returnItem = function (item) {
        this.loans = this.loans.filter(function (loan) { return loan.item.id !== item.id; });
        item.incrementQuantity(); // Increment quantity when returned
        console.log("".concat(this.name, " returned ").concat(item.getDetails()));
    };
    return LibraryMember;
}());
var AdultMember = /** @class */ (function (_super) {
    __extends(AdultMember, _super);
    function AdultMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AdultMember;
}(LibraryMember));
var ChildMember = /** @class */ (function (_super) {
    __extends(ChildMember, _super);
    function ChildMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChildMember;
}(LibraryMember));
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
    }
    Library.prototype.addItem = function (item) {
        this.items.push(item);
        console.log("".concat(item.getDetails(), ". Items added to the library."));
    };
    Library.prototype.retrieveItem = function (id) {
        var filteredItems = this.items.filter(function (item) { return item.id === id; });
        return filteredItems.length > 0 ? filteredItems[0] : undefined;
    };
    Library.prototype.printItems = function () {
        this.items.forEach(function (item) { console.log(item.getDetails()); });
    };
    return Library;
}());
function processLibraryItems(items) {
    items.forEach(function (item) {
        console.log(item.getDetails());
    });
}
//testing
var library = new Library();
var book1 = new FictionBook(1, 'Dune', 'Frank Herbert', '1965', 2, 'Science Fiction');
var book2 = new NonFictionBook(2, 'Sapiens', 'Yuval Noah Harari', '2014', 3, 'History');
var book3 = new ReferenceBook(3, 'Encyclopedia', 'Various', '2000', 4);
library.addItem(book1);
library.addItem(book2);
library.addItem(book3);
var adult = new AdultMember(1, 'John Doe');
var child = new ChildMember(2, 'Aki');
child.borrowItem(book2);
adult.borrowItem(book1);
library.printItems();
