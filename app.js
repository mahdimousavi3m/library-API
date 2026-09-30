const http = require("http");
const fs = require("fs");
const url = require("url");
const crypto = require("crypto");
const db = require("./db.json");



const server = http.createServer((req, res) => {

  console.log("REQ:", req.method, req.url);

  if (req.method === "POST" && req.url === "/api/books") {
    let body = "";

    req.on("data", (data) => {
      body += data.toString();
    });

    req.on("end", () => {
      const book = JSON.parse(body);

      const newBook = {
        id: crypto.randomUUID(),
        ...book,
        free: 1
      };

      db.books.push(newBook);

      fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
        if (err) {
          throw err;
        }

        console.log("newBookAdded");

        res.writeHead(201, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "new book added" }));
        res.end();
      })
    });
  }
  else if (req.method === "GET" && req.url === "/api/books") {
    fs.readFile("db.json", "utf-8", (err, data) => {
      if (err) {
        throw err;
      }

      let db = JSON.parse(data);

      const books = JSON.stringify(db.books);

      console.log(books);

      res.writeHead(200, { "content-type": "application/json" });
      res.write(books);
      res.end();
    })
  }
  else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
    const parsedUrl = url.parse(req.url, true);
    const bookId = parsedUrl.query.id;

    const newBooks = db.books.filter((book) => book.id !== bookId);


    if (newBooks.length === db.books.length) {
      res.writeHead(404, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "book not found!!" }));
      res.end();
    }
    else {
      fs.writeFile("db.json", JSON.stringify({
        ...db,
        books: newBooks
      }),
        (err) => {
          if (err) {
            throw err;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify({ message: "Book deleted" }));
          res.end();
        }
      )
    }
  }
  else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;

    let body = "";

    req.on("data", (data) => {
      body += data.toString();
    });

    req.on("end", () => {
      const book = JSON.parse(body);
      let isfound = false;
      db.books.forEach((bookItem) => {
        if (bookItem.id === bookID) {
          isfound = true;

          bookItem.title = book.title;
          bookItem.author = book.author;
          bookItem.price = book.price;
        }
      })

      if (isfound) {
        fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
          if (err) {
            throw err;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify({ message: "Book Updated Successfully" }));
          res.end();

        })
      } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Book Not Found" }));
        res.end();
      }

    });
  }
  else if (req.method === "POST" && req.url === "/api/users") {
    let user = "";

    req.on("data", (data) => {
      user += data.toString();
    });

    req.on("end", () => {
      const { userName, email } = JSON.parse(user);

      const isUserExist = db.users.find((user) => user.email === email || user.userName === userName);

      if (userName === "" || email === "") {
        res.writeHead(400, { "content-type": "application/json" });
        res.write(
          JSON.stringify({ message: "user data are not valid" })
        );
        res.end();
      }
      else if (isUserExist) {
        res.writeHead(409, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Email or UserName already is Exist" }));
        res.end();
      } else {
        const newUser = {
          id: crypto.randomUUID(),
          userName,
          email,
          criem: 0,
          role: "USER"
        };

        db.users.push(newUser);

        fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
          if (err) {
            throw err;
          }

          res.writeHead(201, { "content-type": "application/json" });
          res.write(
            JSON.stringify({ message: "New user Registered Successfully" })
          );
          res.end();

        });
      }


    });
  }
  else if (req.method === "PUT" && req.url.startsWith("/api/users/upgrade")) {
    const parsedUrl = url.parse(req.url, true);
    const userID = parsedUrl.query.id;

    console.log("userId:", userID)

    db.users.forEach((user) => {
      if (user.id === userID) {
        console.log("found user")
        user.role = "ADMIN";
      }
    });

    fs.writeFile("./db.json", JSON.stringify(db, null, 2), (err) => {
      if (err) {
        throw err;
      }

      res.writeHead(200, { "content-type": "application/json" });
      res.write(JSON.stringify({ message: "User Upgraded Successfuly " }));
      res.end();
    })
  }
  else if (req.method === "PUT" && req.url.startsWith("/api/users")) {
    const parsedUrl = url.parse(req.url, true);
    const userID = parsedUrl.query.id;

    let reqBody = "";

    req.on("data", (data) => {
      reqBody += data.toString();
    });

    req.on("end", () => {
      const { crime } = JSON.parse(reqBody);

      let isfound = false;
      db.users.forEach((user) => {
        if (user.id === userID) {
          user.crime = crime;
          isfound = true;
        }
      });

      if (isfound) {
        fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
          if (err) {
            throw err;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify({ message: "Cime Set Successfully" }));
          res.end();

        })
      } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "User Not Found" }));
        res.end();
      }


    });
  }
  else if (req.method === "POST" && req.url.startsWith("/api/users/login")) {


    let user = "";

    req.on("data", (data) => {
      user += data;
    });

    req.on("end", () => {
      const { userName, email } = JSON.parse(user);

      const mainUser = db.users.find(
        (user) => user.userName === userName && user.email === email
      );


      if (mainUser) {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(
          JSON.stringify({ userName: mainUser.userName, email: mainUser.email })
        );
        res.end();
      } else {
        res.writeHead(401, { "content-type": "applicaion/json" });
        res.write(JSON.stringify({ message: "User not Found" }));
        res.end();
      }
    })

  }
  else if (req.method === "POST" && req.url === "/api/books/rent") {
    let reqBody = "";

    req.on("data", (data) => {
      reqBody += data.toString();
    });

    req.on("end", () => {
      let { userID, bookID } = JSON.parse(reqBody);

      const findBook = db.books.find((book) => book.id === bookID);
      const findUser = db.users.find((user) => user.id === userID);

      if (!findBook) {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Book not found!" }));
        res.end();
      }

      else if (!findUser) {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "User not found" }));
        res.end();
      }

      else if (findBook.free === 0) {
        res.writeHead(409, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Book not available" }));
        res.end();
      }

      else {
        db.books.forEach((book) => {
          if (book.id === bookID) {
            book.free = 0;
          }
        });

        const newRent = {
          id: crypto.randomUUID(),
          userID,
          bookID
        };

        db.rents.push(newRent);

        fs.writeFile(
          "./db.json",
          JSON.stringify(db, null, 2),
          (err) => {
            if (err) {
              throw err;
            }

            res.writeHead(201, {
              "content-type": "application/json"
            });

            res.write(
              JSON.stringify({
                message: "Book Reserved Successfully"
              })
            );

            res.end();
          }
        );
      }
    });
  }
  else if (req.method === "POST" && req.url === "/api/books/return") {

    let reqBody = "";

    req.on("data", (data) => {
      reqBody += data.toString();
    });

    req.on("end", () => {
      let { userID, bookID } = JSON.parse(reqBody);

      const findBook = db.books.find((book) => book.id === bookID);
      const findUser = db.users.find((user) => user.id === userID);

      if (!findBook) {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Book not found!" }));
        res.end();
      }

      else if (!findUser) {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "User not found" }));
        res.end();
      }

      else {

        const findRent = db.rents.find(
          (rent) => rent.userID === userID && rent.bookID === bookID
        );

        console.log("userID" , userID);
        console.log("bookID" , bookID);
        console.log("rents" , db.rents); 


        if (!findRent) {
          res.writeHead(404, { "content-type": "application/json" });
          res.write(JSON.stringify({ message: "The book has not been rented out." }));
          res.end();
        } else {
          const newRent = db.rents.filter(
            (rent) => rent.id !== findRent.id
          );

          db.rents = newRent;
          findBook.free = 1;

          fs.writeFile("db.json", JSON.stringify(db, null, 2),
            (err) => {
              if (err) {
                throw err;
              }

              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify({ message: "The book was delivered to the library" }));
              res.end();
            }
          )
        }
      }
    });
  }
});


server.listen(8000, () => {
  console.log("server running in port 8000")
})




