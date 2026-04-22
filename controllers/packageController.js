const Package = require('../models/Package');

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPackage = async (req, res) => {
    try {
        const newPackage = await Package.create(req.body);
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
