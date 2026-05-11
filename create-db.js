const mysql = require('mysql2/promise');
const db = require('./config/db');
require('dotenv').config();

const { Category, Package, User, Testimonial, Contact, Gallery } = require('./models');

const createDatabaseAndTables = async () => {
    try {
        // Step 1: Buat database terlebih dahulu (tanpa Sequelize)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });

        console.log('📦 Creating database...');
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
        console.log(`✅ Database '${process.env.DB_NAME}' created successfully!`);
        await connection.end();

        // Step 2: Connect ke database menggunakan Sequelize
        console.log('\n🔗 Connecting to database...');
        await db.authenticate();
        console.log('✅ Connected to database!');

        // Step 3: Sync semua model (buat tabel)
        console.log('\n🔨 Creating tables...');
        await db.sync({ force: false }); // force: false = jangan hapus tabel lama
        console.log('✅ All tables created successfully!');

        console.log('\n🎉 Database setup complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createDatabaseAndTables();