
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/book");
const cors = require("cors");


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/book", bookRouter);

// Home route
app.get("/", (req, res) => {
    res.send("Hello world");
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud-ops")
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Database connection failed:", error.message);
    });
app.listen(8000, () => {
    console.log(`Server running on port :${PORT}`);
});