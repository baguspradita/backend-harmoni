const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.update(req.body, { where: { id } });
        res.json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({ where: { id } });
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
