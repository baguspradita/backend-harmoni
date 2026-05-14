const Package = require('../models/Package');
const cloudinary = require('cloudinary').v2;

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const packageData = await Package.findByPk(id);
        if (!packageData) return res.status(404).json({ message: "Package not found" });
        res.json(packageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPackage = async (req, res) => {
    try {
        console.log('\n=== CREATE PACKAGE ===');
        console.log('📦 req.file:', JSON.stringify(req.file, null, 2));
        console.log('📦 req.body keys:', Object.keys(req.body));

        // File sudah diupload ke Cloudinary by multer
        const imageUrl = req.file?.path || req.body?.image;
        console.log('\n🖼️ Image URL yang digunakan:', imageUrl);

        if (!imageUrl) {
            console.warn('⚠️ WARNING: Tidak ada image URL!');
        }

        const newPackage = await Package.create({
            ...req.body,
            image: imageUrl  // URL dari Cloudinary
        });

        console.log('✅ Package created:', newPackage.id);
        console.log('🖼️ Image saved:', newPackage.image);
        res.status(201).json(newPackage);
    } catch (error) {
        console.error('❌ Create error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('\n=== UPDATE PACKAGE ===' );
        console.log('🔄 Package ID:', id);
        console.log('📦 req.file:', JSON.stringify(req.file, null, 2));
        console.log('📦 req.body:', req.body);
        
        // 1. Ambil package lama untuk dapat image lama
        const oldPackage = await Package.findByPk(id);
        if (!oldPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        // 2. Jika ada image baru, delete image lama dari Cloudinary
        if (req.file && oldPackage.image) {
            try {
                console.log('📎 Old image URL:', oldPackage.image);
                
                // Extract public_id dari URL Cloudinary
                const urlParts = oldPackage.image.split('/upload/');
                if (urlParts.length === 2) {
                    const afterUpload = urlParts[1];
                    const pathParts = afterUpload.split('/');
                    
                    const fileName = pathParts[pathParts.length - 1].split('.')[0];
                    const folder = pathParts[pathParts.length - 2];
                    const oldPublicId = `${folder}/${fileName}`;
                    
                    console.log('Deleting old image from Cloudinary:', oldPublicId);
                    await cloudinary.uploader.destroy(oldPublicId);
                    console.log('Old image deleted from Cloudinary:', oldPublicId);
                }
            } catch (cloudError) {
                console.warn('Failed to delete old image:', cloudError.message);
                // Lanjutkan update meski delete lama gagal
            }
        }

        // 3. Tentukan image URL yang akan digunakan
        const imageUrl = req.file?.path || req.body?.image || oldPackage.image;
        console.log('\nImage URL yang digunakan:', imageUrl);

        // 4. Update database
        const [updated] = await Package.update(
            { ...req.body, image: imageUrl },
            { where: { id } }
        );
        
        if (updated) {
            const updatedPackage = await Package.findByPk(id);
            console.log('Package updated:', id);
            console.log('Image saved:', updatedPackage.image);
            return res.json(updatedPackage);
        }
        res.status(404).json({ message: "Package not found" });
    } catch (error) {
        console.error('Update error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('\n=== DELETE PACKAGE ===');
        console.log('Package ID:', id);

        // 1. Ambil package untuk dapat image URL
        const packageData = await Package.findByPk(id);
        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }

        console.log('📎 Image URL:', packageData.image);

        // 2. Delete file dari Cloudinary jika ada
        if (packageData.image) {
            try {
                // Extract public_id dari URL Cloudinary
                // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{timestamp}/{folder}/{filename}
                const urlParts = packageData.image.split('/upload/');
                console.log('🔍 urlParts:', urlParts);

                if (urlParts.length === 2) {
                    // urlParts[1] = 'v1778763198/harmoni-packages/vhwm70ch3ed0a513boj1.png'
                    const afterUpload = urlParts[1];
                    console.log('📝 afterUpload:', afterUpload);

                    // Ambil path setelah version (dari folder pertama)
                    const pathParts = afterUpload.split('/');
                    console.log('📝 pathParts:', pathParts);

                    // Public ID = folder/filename (tanpa version, tanpa extension)
                    const fileName = pathParts[pathParts.length - 1].split('.')[0];
                    const folder = pathParts[pathParts.length - 2];
                    const publicId = `${folder}/${fileName}`;

                    console.log('📤 Extracted publicId:', publicId);
                    console.log('📤 Attempting to delete from Cloudinary...');

                    const result = await cloudinary.uploader.destroy(publicId);
                    console.log('📤 Cloudinary destroy result:', JSON.stringify(result, null, 2));
                    console.log('✅ Image deleted from Cloudinary:', publicId);
                }
            } catch (cloudError) {
                console.error('❌ Cloudinary delete error:', cloudError.message);
                console.error('Full error:', cloudError); // Lanjutkan delete dari DB meski Cloudinary gagal
            }
        }

        // 3. Delete dari database
        const deleted = await Package.destroy({ where: { id } });
        if (deleted) {
            console.log('✅ Package deleted from database:', id);
            return res.json({ message: "Package deleted successfully" });
        }
        res.status(404).json({ message: "Package not found" });
    } catch (error) {
        console.error('❌ Delete error:', error.message);
        res.status(400).json({ message: error.message });
    }
};