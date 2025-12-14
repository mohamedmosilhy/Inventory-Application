const {
  addNewInstrumentToDb,
  selectAllCategories,
  selectInstrument,
  editInstrumentInDb,
  deleteInstrumentFromDb,
} = require("../db/query");

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
  showEditInstrumentForm: async (req, res) => {
    try {
      const instrumentId = req.params.id;
      const instrument = await selectInstrument(instrumentId);
      if (!instrument) {
        return res.status(404).send("Instrument not found");
      }
      const categories = await selectAllCategories();
      res.render("instruments/editInstrument.ejs", {
        title: "Edit Instrument",
        instrument: instrument,
        categories: categories,
        errors: [],
      });
    } catch (error) {
      console.error("Error showing edit form:", error);
      res.status(500).send("Error loading edit form");
    }
  },
  editInstrument: async (req, res) => {
    try {
      const errors = validationResult(req);
      const instrumentId = req.params.id;
      if (!errors.isEmpty()) {
        const categories = await selectAllCategories();
        return res.status(400).render("instruments/editInstrument.ejs", {
          title: "Edit Instrument",
          instrument: { id: instrumentId, ...req.body },
          categories: categories,
          errors: errors.array(),
        });
      }
      const { name, category_id, price, brand, quantity } = req.body;
      await editInstrumentInDb(
        instrumentId,
        name,
        category_id,
        price,
        brand,
        quantity
      );
      res.redirect(`/categories/${category_id}`);
    } catch (error) {
      console.error("Error editing instrument:", error);
      res.status(500).send(`Error editing instrument: ${error.message}`);
    }
  },
  deleteInstrument: async (req, res) => {
    try {
      const instrumentId = req.params.id;
      const instrument = await selectInstrument(instrumentId);
      if (!instrument) {
        return res.status(404).send("Instrument not found");
      }
      const categoryId = instrument.category_id;
      await deleteInstrumentFromDb(instrumentId);
      res.redirect(`/categories/${categoryId}`);
    } catch (error) {
      console.error("Error deleting instrument:", error);
      res.status(500).send("Error deleting instrument");
    }
  },
};
