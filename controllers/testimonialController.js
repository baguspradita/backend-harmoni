const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findByPk(id);
        if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
        res.json(testimonial);
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

exports.updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Testimonial.update(req.body, { where: { id } });
        if (updated) {
            const updatedTestimonial = await Testimonial.findByPk(id);
            return res.json(updatedTestimonial);
        }
        res.status(404).json({ message: "Testimonial not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Testimonial.destroy({ where: { id } });
        if (deleted) {
            return res.json({ message: "Testimonial deleted successfully" });
        }
        res.status(404).json({ message: "Testimonial not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
