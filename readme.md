Muhammad Syauqi Murtadlo (2202041082) - WhatsApp AI Assistant

### 1. Install Dependency

```bash
npm install
```

### 2. Buat `.env`

Isi file `.env` di root project dengan API key dari Groq:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3055
```

### 3. Jalankan Server

```bash
node wa.js
```

Pada run pertama, scan QR code WhatsApp di terminal menggunakan aplikasi WhatsApp di HP Anda.

---

## Cara Penggunaan

### 1. Chat di WhatsApp

- Kirim pesan ke bot di WhatsApp.

- Awali pertanyaan dengan `.AI` (case-insensitive) untuk mendapatkan jawaban dari AI Groq.
  Bot akan membalas dengan jawaban dari AI berdasarkan pertanyaan yang diajukan.
  Contoh:

  ```
  .AI Siapa presiden Indonesia saat ini?
  ```

- Jika pesan tidak diawali `.AI`, bot akan mengirimkan panduan penggunaan.

### 2. API Endpoint

POST `http://localhost:3055/ai`

Body:

```json
{
  "message": "Apa itu Groq?"
}
```

Response:

```json
{
  "reply": "Penjelasan dari AI..."
}
```

## Troubleshooting

- QR Code tidak muncul?
  Pastikan sudah jalankan `node wa.js` di terminal, dan WhatsApp belum login di sesi sebelumnya.

- API Key error:
  Pastikan `GROQ_API_KEY` sudah benar di file `.env`.

- Port bentrok:
  Ganti nilai `PORT` di file, default: `3055`.
