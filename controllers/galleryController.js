const Gallery = require('../models/Gallery');
const cloudinary = require('cloudinary').v2;

exports.getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.findAll();
        res.json(galleries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGalleryById = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await Gallery.findByPk(id);
        if (!gallery) return res.status(404).json({ message: "Gallery image not found" });
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGallery = async (req, res) => {
    try {
        console.log('\n=== CREATE GALLERY ===' );
        console.log('📦 req.file:', JSON.stringify(req.file, null, 2));
        console.log('📦 req.body:', req.body);

        // File sudah diupload ke Cloudinary by multer
        const imageUrl = req.file?.path || req.body?.image;
        console.log('\n🖼️ Image URL yang digunakan:', imageUrl);

        if (!imageUrl) {
            console.warn('⚠️ WARNING: Tidak ada image URL!');
        }

        const newGallery = await Gallery.create({
            ...req.body,
            image: imageUrl  // URL dari Cloudinary
        });
        
        console.log('✅ Gallery created:', newGallery.id);
        console.log('🖼️ Image saved:', newGallery.image);
        res.status(201).json(newGallery);
    } catch (error) {
        console.error('❌ Create error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.updateGallery = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('\n=== UPDATE GALLERY ===' );
        console.log('🔄 Gallery ID:', id);
        console.log('📦 req.file:', JSON.stringify(req.file, null, 2));
        console.log('📦 req.body:', req.body);
        
        // 1. Ambil gallery lama untuk dapat image lama
        const oldGallery = await Gallery.findByPk(id);
        if (!oldGallery) {
            return res.status(404).json({ message: "Gallery not found" });
        }

        // 2. Jika ada image baru, delete image lama dari Cloudinary
        if (req.file && oldGallery.image) {
            try {
                console.log('📎 Old image URL:', oldGallery.image);
                
                // Extract public_id dari URL Cloudinary
                const urlParts = oldGallery.image.split('/upload/');
                if (urlParts.length === 2) {
                    const afterUpload = urlParts[1];
                    const pathParts = afterUpload.split('/');
                    
                    const fileName = pathParts[pathParts.length - 1].split('.')[0];
                    const folder = pathParts[pathParts.length - 2];
                    const oldPublicId = `${folder}/${fileName}`;
                    
                    console.log('🗑️ Deleting old image from Cloudinary:', oldPublicId);
                    await cloudinary.uploader.destroy(oldPublicId);
                    console.log('✅ Old image deleted from Cloudinary:', oldPublicId);
                }
            } catch (cloudError) {
                console.warn('⚠️ Failed to delete old image:', cloudError.message);
                // Lanjutkan update meski delete lama gagal
            }
        }

        // 3. Tentukan image URL yang akan digunakan
        const imageUrl = req.file?.path || req.body?.image || oldGallery.image;
        console.log('\n🖼️ Image URL yang digunakan:', imageUrl);

        // 4. Update database
        const [updated] = await Gallery.update(
            { ...req.body, image: imageUrl },
            { where: { id } }
        );
        
        if (updated) {
            const updatedGallery = await Gallery.findByPk(id);
            console.log('✅ Gallery updated:', id);
            console.log('🖼️ Image saved:', updatedGallery.image);
            return res.json(updatedGallery);
        }
        res.status(404).json({ message: "Gallery not found" });
    } catch (error) {
        console.error('❌ Update error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('\n=== DELETE GALLERY ===' );
        console.log('🔄 Gallery ID:', id);
        
        // 1. Ambil gallery untuk dapat image URL
        const galleryData = await Gallery.findByPk(id);
        if (!galleryData) {
            return res.status(404).json({ message: "Gallery not found" });
        }

        console.log('📎 Image URL:', galleryData.image);

        // 2. Delete file dari Cloudinary jika ada
        if (galleryData.image) {
            try {
                // Extract public_id dari URL Cloudinary
                const urlParts = galleryData.image.split('/upload/');
                
                if (urlParts.length === 2) {
                    const afterUpload = urlParts[1];
                    const pathParts = afterUpload.split('/');
                    
                    const fileName = pathParts[pathParts.length - 1].split('.')[0];
                    const folder = pathParts[pathParts.length - 2];
                    const publicId = `${folder}/${fileName}`;
                    
                    console.log('📤 Deleting from Cloudinary:', publicId);
                    
                    const result = await cloudinary.uploader.destroy(publicId);
                    console.log('📤 Cloudinary destroy result:', JSON.stringify(result, null, 2));
                    console.log('✅ Image deleted from Cloudinary:', publicId);
                }
            } catch (cloudError) {
                console.error('❌ Cloudinary delete error:', cloudError.message);
                // Lanjutkan delete dari DB meski Cloudinary gagal
            }
        }

        // 3. Delete dari database
        const deleted = await Gallery.destroy({ where: { id } });
        if (deleted) {
            console.log('✅ Gallery deleted from database:', id);
            return res.json({ message: "Gallery deleted successfully" });
        }
        res.status(404).json({ message: "Gallery not found" });
    } catch (error) {
        console.error('❌ Delete error:', error.message);
        res.status(400).json({ message: error.message });
    }
};