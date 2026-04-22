const Category = require('./Category');
const Package = require('./Package');
const Testimonial = require('./Testimonial');
const Contact = require('./Contact');
const Gallery = require('./Gallery');

// Relasi Category - Package
Category.hasMany(Package, {
    foreignKey: 'categoryId',
    as: 'packages'
});

Package.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

module.exports = {
    Category,
    Package,
    Testimonial,
    Contact,
    Gallery
};
