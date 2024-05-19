const { default: mongoose } = require("mongoose");
const connectDB = require("../connect"); // Adjust the path as necessary
const Contact = require("../models/contacts"); // Make sure the path to your model is correct
const { ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function getContacts(req, res) {
  try {
    // await mongoose.connect(uri);
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    console.error("Failed to retrieve contacts", error);
    res.status(500).json({ message: "Failed to retrieve contacts" });
  }
}

async function getContactsById(req, res) {
  try {
    const { id } = req.params;
    // Mongoose automatically converts string IDs to ObjectId, so no need for manual conversion
    const contact = await Contact.findById(id);

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json(contact);
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid ID format" });
    } else {
      console.error("Failed to retrieve contact", error);
      res.status(500).json({ message: "Failed to retrieve contact" });
    }
  }
}

async function createContact(req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    console.log(
      `${firstName}, ${lastName}, ${email}, ${favoriteColor}, ${birthday}`
    ); // Example output: `firstName, lastName, email, favoriteColor, birthday`);

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      res.status(400).send({ message: "All fields are required!" });
      return;
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });
    await newContact.save();

    res.status(201).send({
      id: newContact.firstName,
      message: "Contact saved successfully",
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send({ message: "Failed to create contact" });
  }
}

async function updateContact(req, res) {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact: ", error);

    res.status(500).json({ message: "Failed to update contact" });
  }
}

async function deleteContact(req, res) {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).send({ messages: "Contact not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
}
module.exports = {
  getContacts,
  getContactsById,
  createContact,
  updateContact,
  deleteContact,
};
