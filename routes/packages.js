const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { packageValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');

// ===== PUBLIC ROUTES (Semua orang bisa akses) =====
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);

// ===== PROTECTED ROUTES (Hanya admin yang login) =====
router.post('/', authenticate, packageValidation, validate, packageController.createPackage);
router.put('/:id', authenticate, packageValidation, validate, packageController.updatePackage);
router.delete('/:id', authenticate, packageController.deletePackage);

module.exports = router;