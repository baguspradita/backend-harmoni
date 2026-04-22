const db = require('./config/db');
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
        await Package.bulkCreate([
            {
                name: 'Eksplorasi Pantai Bali',
                description: 'Menikmati keindahan pantai Bali dalam 3 hari 2 malam.',
                price: 2500000,
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                categoryId: categories[0].id
            },
            {
                name: 'City Tour Yogyakarta',
                description: 'Tur keliling kota Gudeg mengunjungi Keraton dan Malioboro.',
                price: 1500000,
                image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa',
                categoryId: categories[1].id
            },
            {
                name: 'Pendakian Gunung Semeru',
                description: 'Rasakan adrenalin mendaki gunung tertinggi di Pulau Jawa.',
                price: 3000000,
                image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
                categoryId: categories[3].id
            }
        ]);
        console.log('Packages seeded... ✅');

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
