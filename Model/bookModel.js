const crypto = require("crypto");
const db = require("../db.json");
const fs = require("fs").promises;




const createBook = async (book) => {
  const newBook = {
    id: crypto.randomUUID(),
    ...book,
    free: 1
  };

  db.books.push(newBook);

  await fs.writeFile(
    "db.json",
    JSON.stringify(db, null, 2),
  );

  return newBook;
};


const getAllBooks = () => {
  return db.books;
};


const deleteBook = async (bookId) => {

  const newBooks = db.books.filter((book) => book.id !== bookId);

  if (newBooks.length === db.books.length) {
    return false;
  } else {
    db.books = newBooks;

    await fs.writeFile("db.json", JSON.stringify(db, null, 2));

    return true;
  }
};


const updateBook = async (bookId, updatedData) => {
  const bookTarget = db.books.find((item) => item.id === bookId);

  if (bookTarget === undefined) {
    return false;
  }

  Object.assign(bookTarget, updatedData);

  await fs.writeFile("db.json", JSON.stringify(db, null, 2));

  return true;
}


const rentBookModel = async (userID, bookID) => {
  const findBook = db.books.find((book) => book.id === bookID);
  const findUser = db.users.find((user) => user.id === userID);

  if (!findBook) {
    return { status: "BOOK_NOT_FOUND" };
  }

  if (!findUser) {
    return { status: "USER_NOT_FOUND" };
  }

  if (findBook.free === 0) {
    return { status: "BOOK_NOT_AVAILABLE" };
  }

  findBook.free = 0;

  const newRent = {
    id: crypto.randomUUID(),
    userID,
    bookID
  };

  db.rents.push(newRent);

  await fs.writeFile("db.json", JSON.stringify(db, null, 2));

  return { status: "SUCCESS" };
};


const returnBookModel = async (userID, bookID) => {
  const findBook = db.books.find((book) => book.id === bookID);
  const findUser = db.users.find((user) => user.id === userID);

  if (!findBook) {
    return { status: "BOOK_NOT_FOUND" };
  }

  if (!findUser) {
    return { status: "USER_NOT_FOUND" };
  }

  const findRent = db.rents.find(
    (rent) => rent.userID === userID && rent.bookID === bookID
  );

  if (!findRent) {
    return { status: "RENT_NOT_FOUND" };
  }

  db.rents = db.rents.filter(
    (rent) => rent.id !== findRent.id
  );

  findBook.free = 1;

  await fs.writeFile("db.json", JSON.stringify(db, null, 2));

  return { status: "SUCCESS" };
};

module.exports = { createBook, getAllBooks, deleteBook, updateBook, rentBookModel , returnBookModel };

