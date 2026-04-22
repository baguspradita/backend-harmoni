const { body } = require('express-validator');

const packageValidation = [
    body('name').notEmpty().withMessage('Nama paket wajib diisi'),
    body('price').isNumeric().withMessage('Harga harus berupa angka').custom(value => value > 0).withMessage('Harga harus lebih besar dari 0'),
    body('categoryId').notEmpty().withMessage('Category ID wajib diisi')
];

const categoryValidation = [
    body('name').notEmpty().withMessage('Nama kategori wajib diisi')
];

const testimonialValidation = [
    body('customer_name').notEmpty().withMessage('Nama pelanggan wajib diisi'),
    body('message').notEmpty().withMessage('Pesan wajib diisi'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating harus antara 1 sampai 5')
];

const contactValidation = [
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('email').isEmail().withMessage('Format email tidak valid'),
    body('message').notEmpty().withMessage('Pesan wajib diisi')
];

const galleryValidation = [
    body('title').notEmpty().withMessage('Judul wajib diisi'),
    body('image').notEmpty().withMessage('URL gambar wajib diisi'),
    body('description').optional()
];

module.exports = {
    packageValidation,
    categoryValidation,
    testimonialValidation,
    contactValidation,
    galleryValidation
};
