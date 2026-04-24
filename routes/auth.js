// Import express untuk routing
const express = require('express');
// Buat router instance
const router = express.Router();
// Import auth controller yang berisi logic register & login
const authController = require('../controllers/authController');

// ===== ROUTE REGISTER =====
// POST /api/auth/register
// Endpoint untuk registrasi user baru
router.post('/register', authController.register);

// ===== ROUTE LOGIN =====
// POST /api/auth/login
// Endpoint untuk login dan mendapatkan JWT token
router.post('/login', authController.login);

// Export router agar bisa digunakan di server.js
module.exports = router;