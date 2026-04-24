const { body } = require('express-validator');

// ===== PACKAGE VALIDATION =====
const packageValidation = [
    body('name').notEmpty().withMessage('Nama paket harus diisi'),
    body('description').notEmpty().withMessage('Deskripsi harus diisi'),
    body('price').isInt().withMessage('Harga harus angka'),
    body('image').notEmpty().withMessage('Gambar harus diisi'),
    body('durasi').notEmpty().withMessage('Durasi harus diisi'),
    body('highlight_utama').notEmpty().withMessage('Highlight utama harus diisi'),
    body('categoryId').isInt().withMessage('Category ID harus angka')
];

// ===== CATEGORY VALIDATION =====
const categoryValidation = [
    body('name').notEmpty().withMessage('Nama kategori wajib diisi')
];

// ===== TESTIMONIAL VALIDATION =====
const testimonialValidation = [
    body('customer_name').notEmpty().withMessage('Nama pelanggan wajib diisi'),
    body('message').notEmpty().withMessage('Pesan wajib diisi'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating harus antara 1 sampai 5')
];

// ===== CONTACT VALIDATION =====
const contactValidation = [
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('email').isEmail().withMessage('Format email tidak valid'),
    body('message').notEmpty().withMessage('Pesan wajib diisi')
];

// ===== GALLERY VALIDATION =====
const galleryValidation = [
    body('image_url').notEmpty().withMessage('URL gambar wajib diisi'),
    body('caption').notEmpty().withMessage('Caption wajib diisi')
];

// ===== EXPORT ALL VALIDATIONS =====
module.exports = {
    packageValidation,
    categoryValidation,
    testimonialValidation,
    contactValidation,
    galleryValidation
};
