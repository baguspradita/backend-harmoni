const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Contact = db.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'contacts',
    timestamps: true
});

module.exports = Contact;
