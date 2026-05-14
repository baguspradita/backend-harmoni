const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Setup Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Validasi Cloudinary config
if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('❌ Cloudinary credentials tidak lengkap di .env');
}

// Setup Multer Storage dengan Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Tentukan folder berdasarkan URL endpoint
        let folderName = 'harmoni-general'; // Default folder

        if (req.originalUrl.includes('packages')) {
            folderName = 'harmoni-packages';
        } else if (req.originalUrl.includes('gallery')) {
            folderName = 'harmoni-gallery';
        }

        return {
            folder: folderName,
            resource_type: 'auto',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
        };
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Max 10MB (increased from 5MB)
        fieldSize: 25 * 1024 * 1024
    },
    abortOnLimit: true,
    fileFilter: (req, file, cb) => {
        console.log('\n📤 File received:', file.originalname, 'Size:', file.size, 'MIME:', file.mimetype);

        // Validasi file type
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedMimes.includes(file.mimetype)) {
            console.error('❌ Format file tidak didukung:', file.mimetype);
            return cb(new Error('❌ Format file tidak didukung. Hanya JPG, PNG, GIF, WEBP'));
        }

        console.log('✅ File validated, passing to Cloudinary...');
        cb(null, true);
    }
});

// Middleware untuk logging setelah upload
const uploadWithLogging = (fieldName) => {
    return (req, res, next) => {
        console.log('\n🔄 Upload middleware started for field:', fieldName);
        upload.single(fieldName)(req, res, (err) => {
            if (err) {
                console.error('❌ Multer error:', err.message);
                return res.status(400).json({ message: err.message });
            }
            console.log('✅ Multer processing done');
            console.log('📦 req.file:', req.file);
            console.log('📦 req.file?.secure_url:', req.file?.secure_url);
            next();
        });
    };
};

module.exports = {
    upload,
    uploadWithLogging
};