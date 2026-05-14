const express = require('express');
const cors = require('cors');
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
app.use(cors());
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

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);

    // Error dari multer (file upload)
    if (err.name === 'MulterError') {
        console.error('📤 MulterError code:', err.code);
        
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                status: 'error',
                message: 'File terlalu besar (max 10MB)'
            });
        }
        if (err.code === 'ABORT') {
            return res.status(408).json({
                status: 'error',
                message: 'Upload timeout atau client disconnect'
            });
        }
        return res.status(400).json({
            status: 'error',
            message: 'File upload error: ' + err.message
        });
    }

    // Error dari request aborted
    if (err.code === 'ECONNABORTED' || err.message?.includes('aborted')) {
        console.error('🔌 Request aborted');
        return res.status(408).json({
            status: 'error',
            message: 'Request timeout - coba upload ulang dengan file lebih kecil'
        });
    }

    // Error umum
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===== START SERVER =====
startServer();