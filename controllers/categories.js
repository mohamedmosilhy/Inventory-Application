const {
  selectAllCategories,
  selectCategoryAndInstruments,
  addNewCategoryToDb,
  editCategoryInDb,
  deleteCategoryFromDb,
} = require("../db/query");

const { validationResult } = require("express-validator");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await selectAllCategories();
      res.render("categories/index.ejs", {
        title: "Categories",
        categories: categories,
      });
    } catch (error) {
      res.status(500).send("Error fetching categories ");
    }
  },
  getSpecificCategory: async (req, res) => {
    try {
      const obj = await selectCategoryAndInstruments(req.params.id);
      res.render("categories/category.ejs", {
        title: "Category",
        category: obj.category,
        instruments: obj.instruments,
      });
    } catch (error) {
      res.status(500).send("Error fetching category ");
    }
  },
  showAddCategoryForm: async (req, res) => {
    try {
      res.render("categories/newCategory.ejs", { title: "New Category" });
    } catch (error) {
      res.status(500).send("Error in renderning the add category form");
    }
  },
  addCategory: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("categories/newCategory.ejs", {
          title: "New Category",
          errors: errors.array(),
          data: req.body,
        });
      }
      const { name, description } = req.body;
      await addNewCategoryToDb(name, description);
      res.redirect("/categories");
    } catch (error) {
      res.status(500).send("Error in renderning the add category form");
    }
  },
  showEditCategoryForm: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const categoryData = await selectCategoryAndInstruments(categoryId);
      if (!categoryData.category) {
        return res.status(404).send("Category not found");
      }
      res.render("categories/editCategory.ejs", {
        title: "Edit Category",
        category: categoryData.category,
      });
    } catch (error) {
      res.status(500).send("Error in renderning the edit category form");
    }
  },
  editCategoryForm: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("categories/editCategory.ejs", {
          title: "Edit Category",
          errors: errors.array(),
          category: { id: req.params.id, ...req.body },
        });
      }
      const { name, description } = req.body;
      await editCategoryInDb(req.params.id, name, description);
      res.redirect("/categories");
    } catch (error) {
      res.status(500).send("Error in renderning the edit category form");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      await deleteCategoryFromDb(categoryId);
      res.redirect("/categories");
    } catch (error) {
      res.status(500).send("Error deleting category");
    }
  },
};
