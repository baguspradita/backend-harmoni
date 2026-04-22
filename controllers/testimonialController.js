const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const newTestimonial = await Testimonial.create(req.body);
        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
