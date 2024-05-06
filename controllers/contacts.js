const connectDB = require("../connect"); // Adjust the path as necessary
const Contact = require("../models/contacts"); // Make sure the path to your model is correct

async function getContacts(req, res) {
  const client = await connectDB();
  if (!client) {
    res.status(500).json({ message: "Failed to connect to database" });
    return;
  }

  try {
    const collection = client.db("contacts").collection("contacts");
    const contacts = await collection.find({}).toArray();
    res.json(contacts);
  } catch (error) {
    console.error("Failed to retrieve contacts", error);
    res.status(500).json({ message: "Failed to retrieve contacts" });
  } finally {
    await client.close(); // Make sure to close the connection when done
  }
}

async function getContactsById(req, res) {
  const client = await connectDB();
  if (!client) {
    res.status(500).json({ message: "Failed to connect to database" });
    return;
  }
  try {
    const id = req.params.id;
    const contact = await client
      .db("contacts")
      .collection("contacts")
      .findOne({ _id: id }); // Ensure you use ObjectId to convert the id string to an ObjectId

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.json(contact);
    }
  } catch (err) {
    console.error("Failed to retrieve contact", err);
    res.status(500).json({ message: "Failed to retrieve contact" });
  } finally {
    await client.close(); // Make sure to close the connection when done
  }
}

module.exports = {
  getContacts,
  getContactsById,
};
