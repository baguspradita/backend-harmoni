const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Gallery = db.define('Gallery', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'galleries',
    timestamps: true
});

module.exports = Gallery;
