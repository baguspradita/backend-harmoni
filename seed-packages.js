// Import database connection
const db = require('./config/db');
// Import models
const { Package } = require('./models');

// Data dummy packages
const packagesData = [
    {
        "name": "Paket Tour Yogyakarta 3 Hari 2 Malam",
        "description": "Jelajahi keindahan candi dan budaya Yogyakarta yang kaya akan sejarah. Paket ini mencakup kunjungan ke situs-situs bersejarah dunia dan pengalaman budaya lokal yang autentik.",
        "price": 1500000,
        "image": "https://images.unsplash.com/photo-1537225228614-b4fad34a82ff?w=400",
        "durasi": "3 Hari 2 Malam",
        "highlight_utama": "Candi Borobudur, Candi Prambanan, Pantai Parangtritis, Taman Pintar Yogyakarta",
        "categoryId": 1
    },
    {
        "name": "Paket Tour Bali 5 Hari 4 Malam",
        "description": "Nikmati keindahan pulau Bali dengan pantai berpasir putih, pura yang indah, dan budaya yang unik. Paket all-inclusive dengan pemandu wisata berpengalaman.",
        "price": 2500000,
        "image": "https://images.unsplash.com/photo-1526772820810-0d7b8c2b5ba8?w=400",
        "durasi": "5 Hari 4 Malam",
        "highlight_utama": "Pura Tanah Lot, Ubud, Pantai Kuta, Pura Besakih, Danau Batur",
        "categoryId": 1
    },
    {
        "name": "Paket Tour Lombok 4 Hari 3 Malam",
        "description": "Jelajahi keindahan tersembunyi Lombok dengan pantai yang eksotis dan budaya Sasak yang kaya. Sempurna untuk petualangan dan relaksasi.",
        "price": 2000000,
        "image": "https://images.unsplash.com/photo-1537902904737-13fc626b59d0?w=400",
        "durasi": "4 Hari 3 Malam",
        "highlight_utama": "Pantai Kuta Lombok, Gili Trawangan, Bukit Merese, Tanjung Aan, Air Terjun Tiu Kelep",
        "categoryId": 1
    },
    {
        "name": "Paket Tour Bandung 2 Hari 1 Malam",
        "description": "Liburan singkat yang sempurna di kota Bandung dengan destinasi wisata alam dan kuliner kelas dunia. Cocok untuk keluarga dan teman-teman.",
        "price": 800000,
        "image": "https://images.unsplash.com/photo-1537225228614-b4fad34a82ff?w=400",
        "durasi": "2 Hari 1 Malam",
        "highlight_utama": "Tangkuban Perahu, Kawah Putih, Perkebunan Teh, Factory Outlet Bandung",
        "categoryId": 1
    },
    {
        "name": "Paket Tour Flores 6 Hari 5 Malam",
        "description": "Petualangan eksotis ke Flores dengan pemandangan alam yang spektakuler dan budaya lokal yang autentik. Termasuk pelayaran ke Pulau Komodo.",
        "price": 3500000,
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        "durasi": "6 Hari 5 Malam",
        "highlight_utama": "Pulau Komodo, Labuan Bajo, Danau Kelimutu, Taman Nasional Komodo, Pulau Padar",
        "categoryId": 2
    },
    {
        "name": "Paket Tour Raja Ampat 7 Hari 6 Malam",
        "description": "Jelajahi surganya penyelam dengan terumbu karang terbaik di dunia dan kehidupan laut yang menakjubkan. Paket eksklusif untuk pecinta alam bawah laut.",
        "price": 5000000,
        "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        "durasi": "7 Hari 6 Malam",
        "highlight_utama": "Snorkeling Raja Ampat, Pantai Pasir Putih, Pulau Wai, Diving di Spot Terbaik",
        "categoryId": 2
    },
    {
        "name": "Paket Tour Jakarta & Kepulauan Seribu 3 Hari 2 Malam",
        "description": "Kunjungi ibu kota Indonesia dan nikmati keindahan kepulauan tropis di Seribu. Kombinasi sempurna antara budaya perkotaan dan pantai yang indah.",
        "price": 1200000,
        "image": "https://images.unsplash.com/photo-1537202331612-72b27e84530f?w=400",
        "durasi": "3 Hari 2 Malam",
        "highlight_utama": "Museum Nasional, Kota Tua Jakarta, Pulau Seribu, Pantai Cantik Kepulauan Seribu",
        "categoryId": 1
    },
    {
        "name": "Paket Tour Sulawesi 4 Hari 3 Malam",
        "description": "Temukan keunikan Sulawesi dengan tradisi lokal dan pemandangan alam yang menakjubkan. Destinasi yang cocok untuk petualangan dan fotografi.",
        "price": 2200000,
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        "durasi": "4 Hari 3 Malam",
        "highlight_utama": "Tana Toraja, Danau Poso, Pantai Manado, Taman Nasional Bunaken",
        "categoryId": 2
    },
    {
        "name": "Paket Tour Malang & Bromo 3 Hari 2 Malam",
        "description": "Rasakan keajaiban Gunung Bromo dengan pemandangan matahari terbit yang spektakuler dan keindahan alam di sekitarnya. Petualangan yang tak terlupakan.",
        "price": 1800000,
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        "durasi": "3 Hari 2 Malam",
        "highlight_utama": "Gunung Bromo, Padang Pasir Bromo, Kawah Ijen, Kota Malang",
        "categoryId": 1
    },
    {
        "name": "Paket Tour Aceh & Sabang 4 Hari 3 Malam",
        "description": "Jelajahi keindahan Aceh dengan sejarah yang kaya dan pemandangan alam yang memukau. Termasuk ke Pulau Sabang yang eksotis.",
        "price": 2100000,
        "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        "durasi": "4 Hari 3 Malam",
        "highlight_utama": "Masjid Raya Baiturrahman, Pulau Sabang, Pantai Iboih, Monumen Tsunami",
        "categoryId": 2
    }
];

// Fungsi untuk seed data
async function seedPackages() {
    try {
        // Test koneksi database
        await db.authenticate();
        console.log('Database connected...');

        // Sync models
        await db.sync({ alter: true });
        console.log('Models synchronized...');

        // Insert data packages
        await Package.bulkCreate(packagesData);
        console.log('✅ Data packages berhasil di-seed! (10 paket wisata)');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding packages:', error.message);
        process.exit(1);
    }
}

// Jalankan seed
seedPackages();
