const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { galleryValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');
const { uploadWithLogging } = require('../middlewares/uploadMiddleware');


// ===== PUBLIC ROUTES (Semua orang bisa lihat galeri) =====
router.get('/', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGalleryById);

// ===== PROTECTED ROUTES (Hanya admin yang bisa upload/edit/hapus) =====
router.post('/', authenticate, uploadWithLogging('image'), galleryValidation, validate, galleryController.createGallery);
router.put('/:id', authenticate, uploadWithLogging('image'), galleryValidation, validate, galleryController.updateGallery);
router.delete('/:id', authenticate, galleryController.deleteGallery);

module.exports = router;