const express = require("express");
const { handleBookStore, handleBookListsController, handleBookDeleteController } = require("../controller/book");

const router = express.Router();

router.post("/addbook", handleBookStore);
router.get("/booklists", handleBookListsController);
router.delete("/deletebook", handleBookDeleteController);

module.exports = router;