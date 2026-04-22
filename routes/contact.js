const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactValidation } = require('../middlewares/inputValidation');
const { validate } = require('../middlewares/validator');

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.post('/', contactValidation, validate, contactController.createContact);
router.put('/:id', contactValidation, validate, contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
