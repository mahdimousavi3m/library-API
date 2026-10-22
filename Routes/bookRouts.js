const {
    createBook,
    getAllBooks,
    deleteBook,
    updateBook,
    rentBook,
    returnBook
} = require("../Controller/bookController");

const bookRoutes = (req, res) => {
    if (req.method === "POST" && req.url === "/api/books") {
        return createBook(req, res);
    }
    else if (req.method === "GET" && req.url === "/api/books") {
        return getAllBooks(req, res);
    }
    else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
        return deleteBook(req, res);
    }
    else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
        return updateBook(req, res);
    }
    else if (req.method === "POST" && req.url === "/api/books/rent") {
        return rentBook(req, res);
    }
    else if (req.method === "POST" && req.url === "/api/books/return") {
        return returnBook(req, res);
    }
}



module.exports = bookRoutes; 