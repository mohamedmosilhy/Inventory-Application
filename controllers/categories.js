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
      console.error("Error fetching categories:", error);
      res.status(500).render("error.ejs", {
        title: "Error Fetching Categories",
        message: "We couldn't load the categories. Please try again later.",
        details: error.message,
      });
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
      console.error("Error fetching category:", error);
      res.status(500).render("error.ejs", {
        title: "Error Fetching Category",
        message:
          "We couldn't load this category. It may not exist or there was a server error.",
        details: error.message,
      });
    }
  },
  showAddCategoryForm: async (req, res) => {
    try {
      res.render("categories/newCategory.ejs", { title: "New Category" });
    } catch (error) {
      console.error("Error showing add category form:", error);
      res.status(500).render("error.ejs", {
        title: "Error Loading Form",
        message: "We couldn't load the add category form. Please try again.",
        details: error.message,
      });
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
      console.error("Error adding category:", error);
      res.status(500).render("error.ejs", {
        title: "Error Adding Category",
        message:
          "We couldn't add the category. Please check your input and try again.",
        details: error.message,
      });
    }
  },
  showEditCategoryForm: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const categoryData = await selectCategoryAndInstruments(categoryId);
      if (!categoryData.category) {
        return res.status(404).render("error.ejs", {
          title: "Category Not Found",
          message: "The category you're looking for doesn't exist.",
        });
      }
      res.render("categories/editCategory.ejs", {
        title: "Edit Category",
        category: categoryData.category,
      });
    } catch (error) {
      console.error("Error showing edit category form:", error);
      res.status(500).render("error.ejs", {
        title: "Error Loading Form",
        message: "We couldn't load the edit category form. Please try again.",
        details: error.message,
      });
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
      console.error("Error editing category:", error);
      res.status(500).render("error.ejs", {
        title: "Error Updating Category",
        message: "We couldn't update the category. Please try again.",
        details: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      await deleteCategoryFromDb(categoryId);
      res.redirect("/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).render("error.ejs", {
        title: "Error Deleting Category",
        message:
          "We couldn't delete the category. It may contain instruments that need to be removed first.",
        details: error.message,
      });
    }
  },
};
