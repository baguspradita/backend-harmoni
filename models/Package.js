const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Package = db.define('Package', {
    // ===== FIELD YANG SUDAH ADA =====
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    
    // ===== FIELD BARU =====
    durasi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    highlight_utama: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'packages',
    timestamps: true
});

module.exports = Package;