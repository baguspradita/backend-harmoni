const db = require('./config/db');
const Package = require('./models/Package');
const { Category, Package, Testimonial, Gallery, Contact } = require('./models');

const seedData = async () => {
    try {
        await db.authenticate();
        console.log('Database connected for seeding... 🚀');

        // Hapus data lama agar bersih (Opsional)
        await db.sync({ force: true });
        console.log('Database cleared! 🧹');

        // 1. Buat Kategori
        const categories = await Category.bulkCreate([
            { name: 'Yogyakarta' },
            { name: 'Jawa Tengah' },
            { name: 'Jawa Barat' },
            { name: 'Jawa Timur' },
            { name: 'Nusa Tenggara Barat' }
        ]);
        console.log('Categories seeded... ✅');

        // 2. Buat Paket Wisata
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

        async function seedPackages() {
            try {
                await Package.bulkCreate(packagesData);
                console.log('Data packages berhasil di-seed!');
            } catch (error) {
                console.error('Error seeding:', error);
            }
        }

        seedPackages();

        // 3. Buat Testimoni
        await Testimonial.bulkCreate([
            {
                customer_name: 'Budi Santoso',
                message: 'Pelayanan sangat memuaskan, paket tour Bali sangat berkesan!',
                rating: 5
            },
            {
                customer_name: 'Siti Aminah',
                message: 'Pemandu wisatanya ramah dan pengetahuannya luas.',
                rating: 4
            }
        ]);
        console.log('Testimonials seeded... ✅');

        // 4. Buat Galeri Global
        await Gallery.bulkCreate([
            {
                title: 'Sunset di Candi Borobudur',
                image: 'https://images.unsplash.com/photo-1588668214407-6ed9ad420525',
                description: 'Momen keemasan di stupa Borobudur.'
            },
            {
                title: 'Keindahan Kawah Ijen',
                image: 'https://images.unsplash.com/photo-1539433393114-1e07cb81d6d3',
                description: 'Pemandangan kawah biru yang memukau.'
            },
            {
                title: 'Budaya di Bali',
                image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
                description: 'Tarian tradisional di pura Uluwatu.'
            }
        ]);
        console.log('Galleries seeded... ✅');

        // 5. Buat Contact (Pesan Masuk)
        await Contact.bulkCreate([
            {
                name: 'John Doe',
                email: 'john@mail.com',
                subject: 'Tanya Paket Yogyakarta',
                message: 'Halo, saya tertarik dengan paket City Tour Yogyakarta. Apakah masih ada slot untuk 2 orang?'
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                subject: 'Request Custom Tour',
                message: 'Bisakah saya meminta paket custom untuk perjalanan ke Bromo dan Ijen?'
            }
        ]);
        console.log('Contacts seeded... ✅');

        console.log('Database seeded successfully! 🎉');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
