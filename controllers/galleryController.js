const Gallery = require('../models/Gallery');

exports.getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.findAll();
        res.json(galleries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGallery = async (req, res) => {
    try {
        const newGallery = await Gallery.create(req.body);
        res.status(201).json(newGallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateGallery = async (req, res) => {
    try {
        const { id } = req.params;
        await Gallery.update(req.body, { where: { id } });
        res.json({ message: "Gallery image updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        await Gallery.destroy({ where: { id } });
        res.json({ message: "Gallery image deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
