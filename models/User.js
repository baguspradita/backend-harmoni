// Import DataTypes dari Sequelize untuk mendeskripsikan tipe data
const { DataTypes } = require('sequelize');
// Import database connection dari config
const db = require('../config/db');

// Definisikan model User dengan nama tabel 'users'
const User = db.define('User', {
    // Field ID - primary key yang auto increment
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Field nama user - tidak boleh kosong
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Field email - tidak boleh kosong, unik (tidak boleh ada duplikat)
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // Validasi format email
        validate: {
            isEmail: true
        }
    },
    // Field password - tidak boleh kosong (akan di-hash dengan bcrypt)
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Nama tabel di database
    tableName: 'users',
    // Tambah kolom createdAt & updatedAt secara otomatis
    timestamps: true
});

// Export model agar bisa digunakan di file lain
module.exports = User;