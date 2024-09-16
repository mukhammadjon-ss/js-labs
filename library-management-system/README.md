# Library Management System

## Overview

This project involves building a system to manage a library’s inventory of books and its members. The system will handle different types of books (e.g., fiction, non-fiction, reference) and different types of library members (e.g., adults, children). It will also manage the loaning and returning of books.

## Task Requirements

### 1. LibraryItem

-   Create an abstract class `LibraryItem` to represent basic properties of a library item (e.g., `id`).
-   Implement a method `getDetails()` that returns a string describing the library item.

### 2. Books

-   Create a class `Book` to represent general books with properties like `title`, `author`, and `publishedDate`.
-   Create subtypes of `Book`:
    -   `FictionBook`: A book that belongs to a specific genre (e.g., fantasy, science fiction).
    -   `NonFictionBook`: A book that belongs to a category (e.g., history, biography).
    -   `ReferenceBook`: A book used for reference purposes only.

### 3. Library Members

-   Create a class `LibraryMember` that represents a member of the library.
    -   Each member should be able to borrow and return items from the library.
-   Create specific member types:
    -   `AdultMember`: An adult member of the library.
    -   `ChildMember`: A child member of the library with different borrowing rules.

### 4. Loan Management

-   Implement a system to manage book loans. A loan should:
    -   Link a `LibraryMember` with a borrowed book.
    -   Track the loan and return dates.

### 5. Library

-   Implement a generic `Library<T>` class that can store and manage any type of `LibraryItem` (e.g., books, magazines).
-   It should include functionality to add items to the library and retrieve items from the library.

### 6. Book Processing

-   Implement a function to process library items, such as books and magazines, and print their details.
-   This function should handle multiple types of items and call the `getDetails()` method on each item.

## Deliverables

-   A system that models a library with different types of books and members.
-   Functionality to:
    -   Add books to the library.
    -   Borrow and return books.
    -   Manage loans for members.
-   A generic `Library` class that manages library items in a type-safe manner.
