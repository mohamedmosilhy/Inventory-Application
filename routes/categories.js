const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getAllCategories,
  getSpecificCategory,
  showAddCategoryForm,
  addCategory,
} = require("../controllers/categories");

router.get("/", getAllCategories);
router.get("/new", showAddCategoryForm);
router.post(
  "/new",
  [body("name").trim().notEmpty().withMessage("Name should not be empty")],
  addCategory
);
router.get("/:id", getSpecificCategory);

module.exports = router;
