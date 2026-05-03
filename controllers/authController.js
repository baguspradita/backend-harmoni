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
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi" });
        }

        // Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });

        // Cek user ada dan password cocok
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Email atau password salah" });
        }

        // Buat JWT token (HAPUS role dari sini)
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return token dan data user
        res.status(200).json({
            status: "success",
            message: "Login berhasil",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===== FUNCTION VERIFY TOKEN =====
exports.verify = async (req, res) => {
    try {
        // Token sudah di-verify oleh middleware authenticate
        // Jika sampai sini, berarti token valid
        const user = req.user; // Dari middleware authenticate

        res.status(200).json({
            status: "success",
            message: "Token valid",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(401).json({ message: "Token tidak valid" });
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