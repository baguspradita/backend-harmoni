const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            status: "success",
            data: categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({
            status: "success",
            data: category
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({
            status: "success",
            message: "Category berhasil dibuat",
            data: newCategory
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.update(req.body, { where: { id } });
        const updatedCategory = await Category.findByPk(id);
        res.status(200).json({
            status: "success",
            message: "Category berhasil diupdate",
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({ where: { id } });
        res.status(200).json({
            status: "success",
            message: "Category berhasil dihapus"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};