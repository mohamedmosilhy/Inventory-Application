const {
  selectAllCategories,
  selectCategoryAndInstruments,
} = require("../db/query");

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
};
