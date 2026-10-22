const url = require("url");

const {
    createBook: createBookModel,
    getAllBooks: getAllBooksModel,
    deleteBook: deleteBookModel,
    updateBook: updateBookModel , 
    rentBookModel , 
    returnBookModel 
} = require("../Model/bookModel");



const createBook = async (req, res) => {
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    req.on("end", async () => {

        const book = JSON.parse(body);

        const newBook = await createBookModel(book);

        res.writeHead(201, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({ message: "new book added" }));
        res.end();
    });
}


const getAllBooks = (req, res) => {
    const books = getAllBooksModel();

    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify(books));
    res.end();
};

const deleteBook = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const bookId = parsedUrl.query.id;
    const isDeleted = await deleteBookModel(bookId);

    if (isDeleted) {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "book deletd successfully" }));
        res.end();
    }
    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.write(JSON.stringify({ message: "Book not found" }));
        res.end();
    }
}

const updateBook = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const bookId = parsedUrl.query.id;
    let body = "";
    req.on("data", (data) => {
        body += data.toString();
    })

    req.on("end", async () => {
        const book = JSON.parse(body);
        const isUpdated = await updateBookModel(bookId, book);

        if (isUpdated) {
            res.writeHead(200, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "Book Updated Successfully" }));
            res.end();
        }
        else {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "Book Not Found" }));
            res.end();
        }
    })
}


const rentBook = async (req, res) => {
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    req.on("end", async () => {
        const { userID, bookID } = JSON.parse(body);

        const result = await rentBookModel(userID, bookID);

        if (result.status === "BOOK_NOT_FOUND") {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "Book not found!" }));
            return res.end();
        }

        if (result.status === "USER_NOT_FOUND") {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "User not found" }));
            return res.end();
        }

        if (result.status === "BOOK_NOT_AVAILABLE") {
            res.writeHead(409, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "Book not available" }));
            return res.end();
        }

        res.writeHead(201, { "content-type": "application/json" });
        res.write(JSON.stringify({
            message: "Book Reserved Successfully"
        }));
        res.end();
    });
};


const returnBook = async (req, res) => {
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    req.on("end", async () => {
        const { userID, bookID } = JSON.parse(body);

        const result = await returnBookModel(userID, bookID);

        if (result.status === "BOOK_NOT_FOUND") {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "Book not found!" }));
            return res.end();
        }

        if (result.status === "USER_NOT_FOUND") {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({ message: "User not found" }));
            return res.end();
        }

        if (result.status === "RENT_NOT_FOUND") {
            res.writeHead(404, { "content-type": "application/json" });
            res.write(JSON.stringify({
                message: "The book has not been rented out."
            }));
            return res.end();
        }

        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({
            message: "The book was delivered to the library"
        }));
        res.end();
    });
};

module.exports = { createBook, getAllBooks, deleteBook, updateBook , rentBook , returnBook}; 