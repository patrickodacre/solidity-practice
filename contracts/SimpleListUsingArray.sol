// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/*
  Strengths:
  - Reliably chronological order
  - Provides a count
  - Random access by Row Number / Index (not ID)

  Weaknesses:

  - No random access by ID
  - No assurance of uniqueness
  - No check for duplicates
  - Uncontrolled growth of the list

  Credit: https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity
 */
contract SimpleListUsingArray {

    struct Book {
        string Title;
        string Author;
    }

    Book[] public books;

    // == Mutative Functions == //

    // newBook adds a Book struct to the books array.
    // a NewBook event is emitted with the last index
    // of the books array
    function newBook(string memory _title, string memory _author)
        public
    {
        Book memory book = Book(_title, _author);
        books.push(book);

        emit NewBook(msg.sender, books.length -1, _title, _author);
    }

    // == Views == //

    function getBookCount()
        public
        view
        returns (uint)
    {
        return books.length;
    }

    // == Events == //

    event NewBook(address indexed user, uint index, string title, string author);
}
