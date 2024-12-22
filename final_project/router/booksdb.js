let books = {
  1: { author: "Chinua Achebe", title: "Things Fall Apart", reviews: {} },
  2: { author: "Hans Christian Andersen", title: "Fairy tales", reviews: {} },
  3: { author: "Dante Alighieri", title: "The Divine Comedy", reviews: {} },
  4: { author: "Unknown", title: "The Epic Of Gilgamesh", reviews: {} },
  5: { author: "Unknown", title: "The Book Of Job", reviews: {} },
  6: { author: "Unknown", title: "One Thousand and One Nights", reviews: {} },
  7: { author: "Unknown", title: "Nj\u00e1l's Saga", reviews: {} },
  8: { author: "Jane Austen", title: "Pride and Prejudice", reviews: {} },
  9: {
    author: "Honor\u00e9 de Balzac",
    title: "Le P\u00e8re Goriot",
    reviews: {},
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
  },
};

const findAllBooks = async () => {
  return new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    }
    reject(new Error("Books not found"));
  });
};

const findAllBooksByAuthor = async (author) => {
  return new Promise((resolve) => {
    if (books) {
      resolve(Object.values(books).filter((book) => book.author === author));
    }
    resolve([]);
  });
};

const findBookByTitle = async (title) => {
  return new Promise((resolve) => {
    if (books) {
      const book = Object.values(books).find((book) => book.title === title);
      if (book) {
        resolve(book);
        return;
      }
    }
    resolve(null);
  });
};

const findBookByISBN = async (isbn) => {
  return new Promise((resolve) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    }
    resolve(null);
  });
};

module.exports.books = books;
module.exports.findAllBooks = findAllBooks;
module.exports.findAllBooksByAuthor = findAllBooksByAuthor;
module.exports.findBookByTitle = findBookByTitle;
module.exports.findBookByISBN = findBookByISBN;
