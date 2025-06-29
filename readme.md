WhatsApp AI Assistant - tianndev

Bot WhatsApp yang terintegrasi dengan Groq API (LLM) sebagai asisten AI.
User bisa bertanya via WhatsApp dengan awalan `.ai` di setiap pesan, bot akan membalas secara otomatis menggunakan AI Groq (model `compound-beta`).
Terdapat juga endpoint API untuk akses AI langsung via HTTP.

---

## Fitur

* Auto-reply WhatsApp: Bot membalas semua pesan berawalan `.ai` secara otomatis menggunakan AI.
* Dukungan Bahasa Indonesia: Sistem asisten sudah diatur untuk bahasa Indonesia.
* API Endpoint: Endpoint `/ai` untuk query AI via HTTP (POST).
* Auto Guide: Pesan guide akan dikirimkan otomatis jika user belum pakai `.ai`.
* Health Check: Endpoint `/` untuk cek server hidup.
* Auto Reconnect: Bot WhatsApp auto-reconnect jika disconnect.
* CORS Support: Sudah support akses dari berbagai origin.

---

## Instalasi

### 1. Clone Repository

```bash
git clone <REPO_URL>
cd <NAMA_FOLDER_REPO>
```

### 2. Install Dependency

```bash
npm install
```

### 3. Buat `.env`

Isi file `.env` di root project dengan API key dari Groq:

```env
GROQ_API_KEY=apikeymuuuu
```

### 4. Jalankan Server

```bash
node index.js
```

Pada run pertama, scan QR code WhatsApp di terminal menggunakan aplikasi WhatsApp di HP Anda.

---

## Cara Penggunaan

### 1. Chat di WhatsApp

* Kirim pesan ke bot di WhatsApp.

* Awali pertanyaan dengan `.ai`
  Contoh:

  ```
  .ai Siapa presiden Indonesia saat ini?
  ```

* Jika pesan tidak diawali `.ai`, bot akan mengirimkan panduan penggunaan.

### 2. API Endpoint

POST `http://localhost:3090/ai`

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

---

## Dependency Utama

* [express](https://www.npmjs.com/package/express)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [cors](https://www.npmjs.com/package/cors)
* [whatsapp-web.js](https://wwebjs.dev/)
* [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)
* [groq-sdk](https://www.npmjs.com/package/groq-sdk)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## Troubleshooting

* QR Code tidak muncul?
  Pastikan sudah jalankan `node index.js` di terminal, dan WhatsApp belum login di sesi sebelumnya.

* API Key error:
  Pastikan `GROQ_API_KEY` sudah benar di file `.env`.

* Port bentrok:
  Ganti nilai `PORT` di file, default: `3090`.

---

## Lisensi

Bebas digunakan untuk belajar dan pengembangan.
Untuk penggunaan produksi atau kebutuhan bisnis, silakan sesuaikan dengan kebutuhan Anda.