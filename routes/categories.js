const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getSpecificCategory,
} = require("../controllers/categories");

router.get("/", getAllCategories);
router.get("/:id", getSpecificCategory);

module.exports = router;
