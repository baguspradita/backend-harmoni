# Dokumentasi API Harmoni (Testing Manual Postman)

Gunakan panduan ini untuk memasukkan data secara manual ke Postman jika Anda tidak ingin menggunakan fitur import collection.

**Base URL**: `http://localhost:3000/api`

---

## 1. Modul: Packages (Paket Wisata)

### A. Ambil Semua Paket
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/packages`

### B. Ambil Detail Paket (by ID)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/packages/1` (Ganti `1` dengan ID yang ada)

### C. Tambah Paket Baru
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/packages`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
    "name": "Paket Tour Jogja 3D2N",
    "description": "Jelajahi keindahan candi dan budaya Yogyakarta.",
    "price": 1500000,
    "image": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa",
    "categoryId": 1
}
```

### D. Update Paket
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/packages/1`
- **Body (raw JSON)**:
```json
{
    "price": 1750000,
    "description": "Deskripsi paket telah diperbarui."
}
```

---

## 2. Modul: Categories (Kategori Wisata)

### A. Tambah Kategori
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/categories`
- **Body (raw JSON)**:
```json
{
    "name": "Adventure"
}
```

---

## 3. Modul: Testimonials (Testimoni)

### A. Tambah Testimoni
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/testimonials`
- **Body (raw JSON)**:
```json
{
    "customer_name": "Rina Wijaya",
    "message": "Liburan yang sangat menyenangkan bersama Harmoni!",
    "rating": 5
}
```

---

## 4. Modul: Contact (Pesan Kontak)

### A. Kirim Pesan
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/contact`
- **Body (raw JSON)**:
```json
{
    "name": "Budi",
    "email": "budi@mail.com",
    "subject": "Tanya Ketersediaan",
    "message": "Halo, apakah paket Bromo masih tersedia untuk bulan depan?"
}
```

---

## 5. Modul: Gallery (Dokumentasi)

### A. Tambah Foto Gallery
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/gallery`
- **Body (raw JSON)**:
```json
{
    "image_url": "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c",
    "caption": "Pemandangan indah saat sunset di Labuan Bajo."
}
```

---

## Cara Input di Postman:
1.  Pilih **Method** (GET/POST/PUT/DELETE).
2.  Masukkan **URL** lengkap.
3.  (Untuk POST/PUT) Klik tab **Body** -> pilih **raw** -> ganti Text jadi **JSON**.
4.  Paste kode JSON di atas ke area teks.
5.  Klik **Send**.
