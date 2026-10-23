
const { Book } = require("../models/book");
const mongoose = require("mongoose");
// POST: Add a new book
const handleBookStore = async (req, res) => {
    console.log("Controller reached!");

    try {
        console.log("Content-Type:", req.headers["content-type"]);
        console.log("Request body:", req.body);

        const { bookName, bookTitle, Author, price } = req.body || {};


        if (
            typeof bookName !== "string" || !bookName.trim() ||
            typeof bookTitle !== "string" || !bookTitle.trim() ||
            typeof Author !== "string" || !Author.trim() ||
            price === undefined || price === null || price === ""
        ) {
            return res.status(400).json({
                Message: "All fields are required",
                Success: false
            });
        }

        // Validate price
        const bookPrice = Number(price);

        if (!Number.isFinite(bookPrice) || bookPrice < 0) {
            return res.status(400).json({
                Message: "Price must be a valid non-negative number",
                Success: false
            });
        }

        // Save book in MongoDB
        const addBook = await Book.create({
            bookName: bookName.trim(),
            bookTitle: bookTitle.trim(),
            Author: Author.trim(),
            price: bookPrice
        });

        return res.status(201).json({
            Message: "Book added successfully",
            Success: true,
            book: addBook
        });

    } catch (error) {
        console.error("Book store error:", error);

        return res.status(500).json({
            Message: error.message,
            Success: false
        });
    }
};


// GET: Fetch all books
const handleBookListsController = async (req, res) => {
    try {
        const bookList = await Book.find({});

        return res.status(200).json({
            Message: "All books fetched successfully",
            Success: true,
            books: bookList
        });

    } catch (error) {
        console.error("Fetch books error:", error);

        return res.status(500).json({
            Message: error.message,
            Success: false
        });
    }
};




const handleBookDeleteController = async (req, res) => {
    try {
        const { id } = req.body || {};

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                Message: "Valid book ID is required",
                Success: false
            });
        }

        const deleted = await Book.deleteOne({ _id: id });

        if (deleted.deletedCount === 0) {
            return res.status(404).json({
                Message: "Book not found",
                Success: false
            });
        }

        return res.status(200).json({
            Message: "Book deleted successfully",
            Success: true
        });

    } catch (error) {
        console.error("Delete book error:", error);

        return res.status(500).json({
            Message: error.message,
            Success: false
        });
    }
};

<<<<<<< HEAD
=======
// Edit/Update
const handleBookUpdateController = async(req,res) =>{
    try {
        const { bookName, bookTitle, Author, price } = req.body || {};

        // Validate required fields
        if (
            typeof bookName !== "string" || !bookName.trim() ||
            typeof bookTitle !== "string" || !bookTitle.trim() ||
            typeof Author !== "string" || !Author.trim() ||
            price === undefined || price === null || price === ""
        ) {
            return res.status(200).json({
                Message: "Successfuly updated",
                Success: true
            });
        }
        const updating = await Book.updateOne({ _id: id},
            {
                $set: {
                    bookName,
                    bookTitle,
                    Author,
                    price
                }
            }
        );

    } catch (error) {
        console.error("Updating book error:", error);

        return res.status(500).json({
            Message: error.message,
            Success: false
        });
    }
}


>>>>>>> 4840dc2 (Add book update functionality)
module.exports = {
    handleBookStore,
    handleBookListsController,
    handleBookDeleteController,
    handleBookUpdateController
};
