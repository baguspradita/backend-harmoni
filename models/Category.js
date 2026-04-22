const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: true
});

module.exports = Category;
