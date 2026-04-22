const express = require('express');
const app = express();
const db = require('./config/db');
require('dotenv').config();

// import routes
const packageRoutes = require('./routes/packages');
const categoryRoutes = require('./routes/categories');
const testimonialRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contact');
const galleryRoutes = require('./routes/gallery');

// import models & associations
const models = require('./models');

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// route API
app.use('/api/packages', packageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);

// testing database connection & sync models
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database connected... ');
        
        // sync models (create tables if not exist)
        await db.sync({ alter: true }); // Menggunakan alter:true untuk menambahkan kolom baru (categoryId)
        console.log('Models synchronized... ');
        
        // run server
        app.listen(PORT, () => {
            console.log(`Server running di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// root route
app.get('/', async (req, res) => {
    try {
        await db.authenticate();
        res.json({
            status: "success",
            message: "Backend Express & MySQL MVC Jalan 🚀",
            database: "Connected"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Backend Jalan, tapi Database TIDAK terkoneksi ❌",
            error: error.message
        });
    }
});

startServer();