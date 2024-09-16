import { Library } from "./lms";
import { books, people } from "./testData";

test("adding/removing items to the library", function () {
    const library = new Library([], [], [], new Map());

    expect(library.getItemsCount()).toBe(0);

    library.addItem(books[0]);
    library.addItem(books[1]);
    expect(library.getItemsCount()).toBe(2);

    library.removeItem(books[0]);
    expect(library.getItemsCount()).toBe(1);
});

test("adding/removing members to the library", function () {
    const library = new Library([], [], [], new Map());

    expect(library.getMembersCount()).toBe(0);

    for (let i = 0; i < 3; ++i) {
        library.addMember(people[i]);
    }
    expect(library.getMembersCount()).toBe(3);

    library.removeMember(people[1]);
    expect(library.getMembersCount()).toBe(2);
});

test("adding the same item does not work", function () {
    const library = new Library([], [], [], new Map());

    library.addItem(books[1]);
    expect(library.getItemsCount()).toBe(1);
    library.addItem(books[1]);
    expect(library.getItemsCount()).toBe(1);
});

test("borrowing/returning a book", function () {
    const library = new Library([...books], [], [], new Map());

    expect(library.getLoansCount()).toBe(0);

    library.addMember(people[0]);
    expect(library.loanItem(books[0], people[0])).toBe(
        "Item lending successful."
    );
    expect(library.getLoansCount()).toBe(1);
    expect(people[0].getBorrowedItemsCount()).toBe(1);

    library.returnItem(books[0], people[0]);
    expect(library.getLoansCount()).toBe(0);
    expect(people[0].getBorrowedItemsCount()).toBe(0);
});

test("non-existent book cannot be borrowed", function () {
    const library = new Library([], [], [], new Map());

    expect(library.loanItem(books[0], people[1])).toBe("Item not found.");
});

test("non-members cannot borrow books", function () {
    const library = new Library([], [], [], new Map());

    library.addItem(books[0]);
    expect(library.loanItem(books[0], people[1])).toBe(
        "Non-members cannot borrow books. Sorry."
    );
});

test("a book cannot be borrowed by multiple people", function () {
    const library = new Library([...books], [...people], [], new Map());

    library.loanItem(books[0], people[1]);
    expect(library.loanItem(books[0], people[2])).toBe(
        "Item in use by another member."
    );
});

test("borrowing too many books", function () {
    const library = new Library([...books], [people[3]], [], new Map());

    console.log = jest.fn();

    for (let i = 0; i < 6; ++i) {
        // borrowing 6 books, limit is 5
        library.loanItem(books[i], people[3]);
    }

    expect(library.getLoansCount()).toBe(5);
    expect(people[3].getBorrowedItemsCount()).toBe(5);
    expect(console.log).toHaveBeenCalledWith(
        "Limit for borrowing books (5) exceeded"
    );
});
