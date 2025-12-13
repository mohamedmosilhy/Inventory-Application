const {
  selectAllCategories,
  selectCategoryAndInstruments,
  addNewCategoryToDb,
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
};
