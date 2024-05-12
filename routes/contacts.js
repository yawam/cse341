const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts");

//route to get all contacts
router.get("/", contactController.getContacts);

//route to get contact by ID
router.get("/:id", contactController.getContactsById);

//route to post contact
router.post("/", contactController.createContact);

//route to update contact
router.put("/:id", contactController.updateContact);

//router to delete contact
router.delete("/:id", contactController.deleteContact);

module.exports = router;
