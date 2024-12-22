const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Bad request" });
  } else if (doesExist(username)) {
    return res.status(409).json({ message: "User already exists" });
  } else {
    const user = { username, password };
    // Add the user to the users array
    users.push(user);
    return res.status(201).json({ message: "User registered" });
  }
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
    let authorBooks = Object.values(books).filter(
      (book) => book.author === author
    );
    if (authorBooks) {
      return res.send(JSON.stringify(authorBooks, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  if (title) {
    let titleBooks = Object.values(books).filter(
      (book) => book.title === title
    );
    if (titleBooks) {
      return res.send(JSON.stringify(titleBooks, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn].reviews, null, 4));
  }
  return res.status(400).json({ message: "Bad request" });
});

module.exports.general = public_users;
