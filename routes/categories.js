const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryValidation, validate, categoryController.createCategory);
router.put('/:id', categoryValidation, validate, categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
