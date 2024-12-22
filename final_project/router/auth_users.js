const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const findBookByISBN = require("./booksdb.js").findBookByISBN;
const regd_users = express.Router();

let users = [];

const registerUser = async (username, password) => {
  return new Promise((resolve) => {
    const user = { username, password };
    users.push(user);
    resolve();
  });
};

const isValid = (username) => {
  return !users.some((user) => user.username === username);
};

const authenticatedUser = async (username, password) => {
  return new Promise((resolve) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
      return user.username === username && user.password === password;
    });

    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

//only registered users can login
regd_users.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (await authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  const newReview = req.body;

  if (!isbn || !username || !newReview) {
    return res.status(400).json({ message: "Invalid request" });
  }
  const book = await findBookByISBN(isbn);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  book.reviews[username] = newReview;
  return res.status(200).json({ message: "Review added successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!isbn || !username) {
    return res.status(400).json({ message: "Invalid request" });
  }
  const book = await findBookByISBN(isbn);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  delete book.reviews[username];
  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.registerUser = registerUser;
