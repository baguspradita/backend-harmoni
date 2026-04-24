# Dokumentasi API Harmoni (Testing Manual Postman)

Gunakan panduan ini untuk memasukkan data secara manual ke Postman jika Anda tidak ingin menggunakan fitur import collection.

**Base URL**: `http://localhost:3000/api`

---

## ⭐ 0. MODUL: Authentication (Login & Register)

### A. Register - Daftar User Baru
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
}
```

**Response Success (201)**:
```json
{
    "status": "success",
    "message": "User berhasil didaftarkan",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

**Response Error - Email sudah terdaftar (400)**:
```json
{
    "message": "Email sudah terdaftar"
}
```

**Response Error - Password tidak cocok (400)**:
```json
{
    "message": "Password tidak cocok"
}
```

---

### B. Login - Masuk & Dapatkan Token
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response Success (200)**:
```json
{
    "status": "success",
    "message": "Login berhasil",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzEzOTIxMjM0LCJleHAiOjE3MTQwMDc2MzR9.ABC123...",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

**Response Error - Email/Password salah (401)**:
```json
{
    "message": "Email atau password salah"
}
```

---

### C. Menggunakan Token untuk Protected Routes

**Setelah mendapat token dari login, simpan token tersebut.**

Untuk mengakses protected routes, tambahkan token ke dalam Header:

- **Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Contoh:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIn0.ABC123...
```

---

### D. Testing Checklist untuk Auth

- [ ] Register dengan email baru → Status 201
- [ ] Register dengan email yang sama 2x → Status 400 (email sudah terdaftar)
- [ ] Register dengan password berbeda → Status 400 (password tidak cocok)
- [ ] Login dengan email & password yang benar → Status 200 + dapat token
- [ ] Login dengan password salah → Status 401
- [ ] Login dengan email yang tidak terdaftar → Status 401

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

---

## 📌 Panduan Testing di Postman

### Step 1: Register User Baru
1. Buka Postman → Create New Request
2. Method: `POST`
3. URL: `http://localhost:3000/api/auth/register`
4. Pilih tab **Body** → **raw** → pilih **JSON**
5. Copy-paste body JSON untuk register
6. Klik **Send** → Harusnya dapat response 201 dengan user data

### Step 2: Login untuk Dapatkan Token
1. Create New Request
2. Method: `POST`
3. URL: `http://localhost:3000/api/auth/login`
4. Copy-paste body JSON untuk login
5. Klik **Send** → Dapatkan token (copy token tersebut)

### Step 3: Gunakan Token untuk Protected Routes
1. Create New Request untuk akses protected route
2. Pilih tab **Headers**
3. Tambah header baru:
   - Key: `Authorization`
   - Value: `Bearer [PASTE_TOKEN_ANDA_DISINI]`
4. Contoh: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
5. Klik **Send** → Request akan diterima jika token valid

---

## 🔗 Quick Copy-Paste untuk Postman

**Register:**
```
POST http://localhost:3000/api/auth/register
{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "passwordConfirm": "test123"
}
```

**Login:**
```
POST http://localhost:3000/api/auth/login
{
    "email": "test@example.com",
    "password": "test123"
}
```
