const router = require("express").Router();
const{
    getAllBooks,
    getBookById,
    addBook
} = require("../models/books.js");

router.get("/books", async (req, res) => {
    const books = await getAllBooks();
    if (books) {
        res.render("books", { title: `the library of ${books.length} Books`, books });
    } else {
      res.redirect("/");
    }
});


router.get("/books/new", (req, res) => {
    res.render("newBook", { title: "New Book" });
});

router.get("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const books = await getBookById(bookId);
    if (books) {
      res.render("book", { title: books.title, books });
    } else {
      res.redirect("/books");
    }
});

router.post("/books", async (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const isbn = req.body.isbn;
  
    const result = await addBook({ author, title, isbn});
    const bookId = result.lastInsertRowid;
  
    res.redirect(`/books/${bookId}`);
  });

module.exports = router;
