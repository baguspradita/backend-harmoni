// Import model User
const User = require('../models/User');
// Import bcryptjs untuk hashing password
const bcrypt = require('bcryptjs');
// Import jsonwebtoken untuk membuat JWT token
const jwt = require('jsonwebtoken');

// ===== FUNCTION REGISTER =====
// Controller untuk proses registrasi user baru
exports.register = async (req, res) => {
    try {
        // Ambil data dari request body
        const { name, email, password, passwordConfirm } = req.body;

        // VALIDASI 1: Cek semua field sudah diisi
        if (!name || !email || !password || !passwordConfirm) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        // VALIDASI 2: Cek password dan passwordConfirm cocok
        if (password !== passwordConfirm) {
            return res.status(400).json({ message: "Password tidak cocok" });
        }

        // VALIDASI 3: Cek email sudah terdaftar sebelumnya
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        // Hash password menggunakan bcryptjs dengan 10 rounds salt
        // Semakin tinggi angka, semakin aman tapi semakin lambat
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru di database dengan password yang sudah di-hash
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword  // Simpan password terenkripsi
        });

        // Return response sukses dengan data user
        res.status(201).json({
            status: "success",
            message: "User berhasil didaftarkan",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
                // Password TIDAK di-return untuk keamanan
            }
        });
    } catch (error) {
        // Jika ada error di database/server, return error
        res.status(500).json({ message: error.message });
    }
};

// ===== FUNCTION LOGIN =====
// Controller untuk proses login user
exports.login = async (req, res) => {
    try {
        // Ambil email dan password dari request body
        const { email, password } = req.body;

        // VALIDASI 1: Cek email dan password diisi
        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi" });
        }

        // VALIDASI 2: Cari user berdasarkan email di database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Jangan spesifik bilang "email tidak ditemukan" karena alasan keamanan
            return res.status(401).json({ message: "Email atau password salah" });
        }

        // VALIDASI 3: Bandingkan password input dengan password terenkripsi di database
        // bcrypt.compare akan men-decrypt password database dan membandingkannya
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Email atau password salah" });
        }

        // ===== BUAT JWT TOKEN =====
        // Payload JWT berisi id dan email user
        // Ini data yang akan di-decode nanti saat verify token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            // Secret key untuk sign token - ambil dari .env atau gunakan default
            process.env.JWT_SECRET || 'your-secret-key',
            // Token berlaku selama 24 jam
            { expiresIn: '24h' }
        );

        // Return response sukses dengan token
        res.status(200).json({
            status: "success",
            message: "Login berhasil",
            token: token,  // Token ini harus disimpan di frontend (localStorage/sessionStorage)
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        // Jika ada error di database/server, return error
        res.status(500).json({ message: error.message });
    }
};

// ===== FUNCTION LOGOUT =====
// Controller untuk proses logout user
// Logout dengan JWT hanya perlu return response sukses
// Token dihapus di client-side (localStorage/sessionStorage)
exports.logout = async (req, res) => {
    try {
        // Karena JWT stateless, logout hanya proses di client
        // Server cukup return response sukses untuk konfirmasi
        res.status(200).json({
            status: "success",
            message: "Logout berhasil. Silakan hapus token dari client.",
            // Opsional: tambah timestamp logout
            loggedOutAt: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};