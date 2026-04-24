// Import semua model
const Category = require('./Category');
const Package = require('./Package');
const Testimonial = require('./Testimonial');
const Contact = require('./Contact');
const Gallery = require('./Gallery');
const User = require('./User');  // TAMBAH: Import User model

// ===== RELASI ANTAR MODEL =====
// Definisikan hubungan Category dan Package

// 1 Category memiliki banyak Package (One-to-Many)
Category.hasMany(Package, {
    foreignKey: 'categoryId',
    as: 'packages'
});

// 1 Package milik 1 Category (Many-to-One)
Package.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

// Export semua model termasuk User
module.exports = {
    Category,
    Package,
    Testimonial,
    Contact,
    Gallery,
    User  // TAMBAH: Export User model
};