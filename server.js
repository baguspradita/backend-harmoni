const express = require('express');
const app = express();
const db = require('./config/db');
require('dotenv').config();

// ===== IMPORT ROUTES =====
// TAMBAH: Import auth routes untuk login & register
const authRoutes = require('./routes/auth');
const packageRoutes = require('./routes/packages');
const categoryRoutes = require('./routes/categories');
const testimonialRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');

// ===== IMPORT MODELS & ASSOCIATIONS =====
// Import semua model termasuk User yang baru
const models = require('./models');

// ===== KONFIGURASI =====
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// Middleware untuk parsing JSON dari request body
app.use(express.json());

// ===== ROUTE API =====
// TAMBAH: Auth routes (register & login) harus diposisikan paling depan
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);

// ===== DATABASE CONNECTION & SERVER START =====
// Async function untuk mengkoneksi database dan start server
const startServer = async () => {
    try {
        // Test koneksi database
        await db.authenticate();
        console.log('Database connected... ');
        
        // Sinkronisasi semua model (buat tabel jika belum ada)
        // alter: true = update kolom jika ada perubahan di model
        await db.sync({ alter: true });
        console.log('Models synchronized... ');
        
        // Jalankan server
        app.listen(PORT, () => {
            console.log(`Server running di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// ===== ROOT ROUTE =====
// Route untuk test apakah server jalan
app.get('/', async (req, res) => {
    try {
        // Test koneksi database
        await db.authenticate();
        res.json({
            status: "success",
            message: "Backend Express & MySQL MVC Jalan 🚀",
            database: "Connected"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Backend Jalan, tapi Database TIDAK terkoneksi ❌",
            error: error.message
        });
    }
});

// ===== START SERVER =====
startServer();