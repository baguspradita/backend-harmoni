const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');
const { authenticate } = require('../middlewares/auth');

// ===== PUBLIC ROUTES (Siapa saja bisa submit form kontak) =====
router.get('/', authenticate, contactController.getAllContacts);  // Hanya admin yang lihat semua
router.get('/:id', authenticate, contactController.getContactById);
router.post('/', contactValidation, validate, contactController.createContact);

// ===== PROTECTED ROUTES (Hanya admin yang bisa edit/hapus) =====
router.put('/:id', authenticate, contactValidation, validate, contactController.updateContact);
router.delete('/:id', authenticate, contactController.deleteContact);

module.exports = router;