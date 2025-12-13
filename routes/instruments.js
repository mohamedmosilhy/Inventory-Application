const express = require("express");
const {
  showAddInstrumentForm,
  addInstrument,
} = require("../controllers/instruments");
const { body } = require("express-validator");
const router = express.Router();

router.get("/new/:categoryId", showAddInstrumentForm);
router.post(
  "/new/:categoryId",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("quantity")
      .isInt({ gt: 0 })
      .withMessage("Quantity must be a positive integer"),
  ],
  addInstrument
);

module.exports = router;
