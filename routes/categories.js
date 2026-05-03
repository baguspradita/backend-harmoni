const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');


// ===== PUBLIC ROUTES (Semua orang bisa akses) =====
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// ===== PROTECTED ROUTES (Hanya yang login) =====
router.post('/', authenticate, categoryValidation, validate, categoryController.createCategory);
router.put('/:id', authenticate, categoryValidation, validate, categoryController.updateCategory);
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;