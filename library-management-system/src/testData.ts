import { Book, AdultMember, ChildMember } from "./lms";

const book1 = new Book(
    `${new Date().getTime() + Math.random()}`,
    "book1",
    "author1",
    "12345678",
    new Date("12/05/1984"),
    "Fiction",
    true
);

const book2 = new Book(
    `${new Date().getTime() + Math.random()}`,
    "book2",
    "author2",
    "12345678",
    new Date("13/08/1784"),
    "Baking",
    true
);

const book3 = new Book(
    `${new Date().getTime() + Math.random()}`,
    "book3",
    "author3",
    "13345678",
    new Date("13/08/2011"),
    "Fantasy",
    true
);

const book4 = new Book(
    `${new Date().getTime() + Math.random()}`,
    "book3",
    "author3",
    "13345678",
    new Date("13/08/2011"),
    "Fantasy",
    true
);

const book5 = new Book(
    `${new Date().getTime() + Math.random()}`,
    "book5",
    "author5",
    "13445568",
    new Date("17/12/1954"),
    "Criminal",
    true
);

const book6 = new Book(
    `${new Date().getTime() + Math.random()}`,
    "book6",
    "author6",
    "13646568",
    new Date("17/12/1914"),
    "Horror",
    false
);

export const books = [book1, book2, book3, book4, book5, book6];

const adult1 = new AdultMember(
    `${new Date().getTime() + Math.random()}`,
    "Patrick",
    25,
    []
);

const adult2 = new AdultMember(
    `${new Date().getTime() + Math.random()}`,
    "George",
    22,
    []
);

const child1 = new ChildMember(
    `${new Date().getTime() + Math.random()}`,
    "Mike",
    12,
    []
);

const child2 = new ChildMember(
    `${new Date().getTime() + Math.random()}`,
    "Steve",
    14,
    []
);

export const people = [adult1, adult2, child1, child2];
