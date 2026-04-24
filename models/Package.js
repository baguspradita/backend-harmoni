const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Package = db.define('Package', {
    // ===== FIELD YANG SUDAH ADA =====
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nama paket wisata'
    },
    description: {
        type: DataTypes.TEXT,
        comment: 'Deskripsi lengkap paket'
    },
    price: {
        type: DataTypes.INTEGER,
        comment: 'Harga paket dalam Rupiah'
    },
    image: {
        type: DataTypes.STRING,
        comment: 'URL gambar paket'
    },
    
    // ===== FIELD BARU =====
    durasi: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Durasi paket (contoh: 3 Hari 2 Malam, 5 Hari 4 Malam)'
    },
    highlight_utama: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Destinasi wisata utama yang akan dikunjungi (pisahkan dengan koma)'
    }
}, {
    tableName: 'packages',
    timestamps: true
});

module.exports = Package;