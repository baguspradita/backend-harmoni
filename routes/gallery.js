const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { galleryValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');

router.get('/', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGalleryById);
router.post('/', galleryValidation, validate, galleryController.createGallery);
router.put('/:id', galleryValidation, validate, galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);

module.exports = router;
