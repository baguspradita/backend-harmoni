const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { packageValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');
const { uploadWithLogging } = require('../middlewares/uploadMiddleware');

// ===== PUBLIC ROUTES (Semua orang bisa akses) =====
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);

// ===== PROTECTED ROUTES (Hanya yang login) =====
// uploadWithLogging('image') = handle file upload dengan field name 'image'
router.post('/', authenticate, uploadWithLogging('image'), packageValidation, validate, packageController.createPackage);
router.put('/:id', authenticate, uploadWithLogging('image'), packageValidation, validate, packageController.updatePackage);
router.delete('/:id', authenticate, packageController.deletePackage);

module.exports = router;