const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 */
router.get("/", contactController.getContacts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: A single contact
 *       404:
 *         description: Contact not found
 */
router.get("/:id", contactController.getContactsById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Invalid input
 */
router.post("/", contactController.createContact);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", contactController.updateContact);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete("/:id", contactController.deleteContact);

module.exports = router;
