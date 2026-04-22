const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createContact = async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
