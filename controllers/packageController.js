const Package = require('../models/Package');

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const packageData = await Package.findByPk(id);
        if (!packageData) return res.status(404).json({ message: "Package not found" });
        res.json(packageData);
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

exports.updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Package.update(req.body, { where: { id } });
        if (updated) {
            const updatedPackage = await Package.findByPk(id);
            return res.json(updatedPackage);
        }
        res.status(404).json({ message: "Package not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Package.destroy({ where: { id } });
        if (deleted) {
            return res.json({ message: "Package deleted successfully" });
        }
        res.status(404).json({ message: "Package not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
