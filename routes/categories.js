const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getAllCategories,
  getSpecificCategory,
  showAddCategoryForm,
  addCategory,
  showEditCategoryForm,
  editCategoryForm,
  deleteCategory,
} = require("../controllers/categories");

router.get("/", getAllCategories);
router.get("/new", showAddCategoryForm);
router.post(
  "/new",
  [body("name").trim().notEmpty().withMessage("Name should not be empty")],
  addCategory
);
router.get("/edit/:id", showEditCategoryForm);
router.post(
  "/edit/:id",
  [body("name").trim().notEmpty().withMessage("Name should not be empty")],
  editCategoryForm
);
router.get("/delete/:id", deleteCategory);
router.post("/delete/:id", deleteCategory);
router.get("/:id", getSpecificCategory);

module.exports = router;
