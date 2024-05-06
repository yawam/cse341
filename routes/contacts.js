const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts");

router.get("/", contactController.getContacts);

router.get("/:id", contactController.getContactsById);

module.exports = router;
