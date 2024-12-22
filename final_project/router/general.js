const express = require("express");
const {
  findAllBooks,
  findBookByISBN,
  findAllBooksByAuthor,
  findAllBooksByTitle,
  findBookByTitle,
} = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const registerUser = require("./auth_users.js").registerUser;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Bad request" });
  } else if (!isValid(username)) {
    return res.status(409).json({ message: "User already exists" });
  } else {
    await registerUser(username, password);
    return res.status(201).json({ message: "User registered" });
  }
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  const books = await findAllBooks();
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    const books = await findBookByISBN(isbn);
    if (books) {
      return res.send(JSON.stringify(books, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;
  if (author) {
    let authorBooks = await findAllBooksByAuthor(author);
    return res.send(JSON.stringify(authorBooks, null, 4));
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;
  if (title) {
    let titleBooks = await findBookByTitle(title);
    if (titleBooks) {
      return res.send(JSON.stringify(titleBooks, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    const book = await findBookByISBN(isbn);
    if (book) {
      return res.send(JSON.stringify(book.reviews, null, 4));
    }
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(400).json({ message: "Bad request" });
});

module.exports.general = public_users;
