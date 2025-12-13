const { addNewInstrumentToDb, selectAllCategories } = require("../db/query");

const { validationResult } = require("express-validator");

module.exports = {
  showAddInstrumentForm: async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      res.render("instruments/addInstrument.ejs", {
        title: "New Instrument",
        categoryId: categoryId,
        errors: [],
        data: {},
      });
    } catch (error) {
      res.status(500).send("Error in renderning the add instrument form");
    }
  },
  addInstrument: async (req, res) => {
    try {
      const errors = validationResult(req);
      const categoryId = req.params.categoryId;
      if (!errors.isEmpty()) {
        return res.status(400).render("instruments/addInstrument.ejs", {
          title: "New Instrument",
          categoryId: categoryId,
          errors: errors.array(),
          data: req.body,
        });
      }
      const { name, price, brand, quantity } = req.body;
      await addNewInstrumentToDb(name, categoryId, price, brand, quantity);
      res.redirect(`/categories/${categoryId}`);
    } catch (error) {
      console.error("Error adding instrument:", error);
      res.status(500).send(`Error adding instrument: ${error.message}`);
    }
  },
};
