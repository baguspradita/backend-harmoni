const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
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

exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Contact.update(req.body, { where: { id } });
        if (updated) {
            const updatedContact = await Contact.findByPk(id);
            return res.json(updatedContact);
        }
        res.status(404).json({ message: "Contact not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Contact.destroy({ where: { id } });
        if (deleted) {
            return res.json({ message: "Contact deleted successfully" });
        }
        res.status(404).json({ message: "Contact not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
