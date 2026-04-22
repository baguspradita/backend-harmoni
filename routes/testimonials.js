const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { testimonialValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');

router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.post('/', testimonialValidation, validate, testimonialController.createTestimonial);
router.put('/:id', testimonialValidation, validate, testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
