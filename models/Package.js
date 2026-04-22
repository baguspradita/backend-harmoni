const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Package = db.define('Package', {
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
    }
}, {
    tableName: 'packages',
    timestamps: true
});

module.exports = Package;
