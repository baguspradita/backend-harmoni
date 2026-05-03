// Import express untuk routing
const express = require('express');
// Buat router instance
const router = express.Router();
// Import auth controller yang berisi logic register & login
const authController = require('../controllers/authController');
// Import middleware authentication
const { authenticate } = require('../middlewares/auth');

// ===== ROUTE REGISTER =====
// POST /api/auth/register
// Endpoint untuk registrasi user baru
router.post('/register', authController.register);

// ===== ROUTE LOGOUT =====
// POST /api/auth/logout
// Endpoint untuk logout
router.post('/logout', authenticate, authController.logout);

// ===== ROUTE LOGIN =====
// POST /api/auth/login
// Endpoint untuk login dan mendapatkan JWT token
router.post('/login', authController.login);

// ===== ROUTE VERIFY  =====
router.get('/verify', authenticate, authController.verify);

// Export router agar bisa digunakan di server.js
module.exports = router;