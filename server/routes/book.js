const express = require("express");
const { handleBookStore, handleBookListsController, handleBookDeleteController,handleBookUpdateController } = require("../controller/book");

const router = express.Router();

router.post("/addbook", handleBookStore);
router.get("/booklists", handleBookListsController);
router.delete("/deletebook", handleBookDeleteController);
router.put("/updatebook", handleBookUpdateController);

module.exports = router;