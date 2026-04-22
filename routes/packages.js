const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { packageValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');

router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);
router.post('/', packageValidation, validate, packageController.createPackage);
router.put('/:id', packageValidation, validate, packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;
