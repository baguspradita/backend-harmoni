const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Testimonial = db.define('Testimonial', {
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    }
}, {
    tableName: 'testimonials',
    timestamps: true
});

module.exports = Testimonial;
