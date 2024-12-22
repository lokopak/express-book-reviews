const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn], null, 4));
  }
  return res.status(400).json({ message: "Bad request" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  if (author) {
    let author_books = Object.values(books).filter(
      (book) => book.author === author
    );
    if (author_books) {
      return res.send(JSON.stringify(author_books, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  if (title) {
    let title_books = Object.values(books).filter(
      (book) => book.title === title
    );
    if (title_books) {
      return res.send(JSON.stringify(title_books, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
