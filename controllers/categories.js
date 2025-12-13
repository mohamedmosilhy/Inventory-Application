const { selectAllCategories } = require("../db/query");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await selectAllCategories();
      res.render("categories/index.ejs", {
        title: "Home Page",
        categories: categories,
      });
    } catch (error) {
      res.status(500).send("Error fetching categories ");
    }
  },
};
