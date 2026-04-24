// Import jsonwebtoken untuk verify JWT token
const jwt = require('jsonwebtoken');

// ===== MIDDLEWARE AUTHENTICATION =====
// Middleware ini digunakan untuk melindungi routes yang memerlukan login
// Cara kerja: cek apakah token valid, jika valid lanjutkan ke route, jika tidak tolak
const authenticate = (req, res, next) => {
    try {
        // Ambil token dari header Authorization
        // Format header: "Authorization: Bearer <token>"
        // Split dengan spasi untuk mendapatkan token saja (bagian ke-2)
        const token = req.headers.authorization?.split(' ')[1];

        // Cek apakah token ada/dikirim
        if (!token) {
            return res.status(401).json({ message: "Token tidak ditemukan" });
        }

        // Verify token menggunakan secret key yang sama saat membuat token
        // Jika token valid, decode dan ambil data payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Simpan data user (dari token) ke req.user agar bisa diakses di route
        req.user = decoded;
        
        // Lanjutkan ke route handler berikutnya
        next();
    } catch (error) {
        // Jika token invalid/expired, return error
        res.status(401).json({ message: "Token tidak valid" });
    }
};

// Export middleware agar bisa digunakan di routes
module.exports = { authenticate };