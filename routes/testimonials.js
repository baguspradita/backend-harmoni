const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { testimonialValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');

// ===== PUBLIC ROUTES (Semua orang bisa lihat & submit testimoni) =====
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', testimonialValidation, validate, testimonialController.createTestimonial);

// ===== PROTECTED ROUTES (Hanya admin yang bisa edit/hapus) =====
router.put('/:id', authenticate, testimonialValidation, validate, testimonialController.updateTestimonial);
router.delete('/:id', authenticate, testimonialController.deleteTestimonial);

module.exports = router;