require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Groq = require('groq-sdk');

const app = express();
const PORT = 3055;

if (!process.env.GROQ_API_KEY) {
  console.error('ERROR: GROQ_API_KEY belum di-set di .env');
  process.exit(1);
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const client = new Client({ authStrategy: new LocalAuth() });

async function aiHandler(message) {
  try {
    const res = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: 'Anda adalah asisten WhatsApp profesional. Nama Anda adalah Muhammad Syauqi Murtadlo',
        },
        { role: 'user', content: message },
      ],
      max_tokens: 1024,
    });
    return res.choices[0]?.message?.content || 'Maaf, saat ini saya tidak dapat memberikan jawaban.';
  } catch (e) {
    console.error('Error dari Groq:', e);
    return 'Maaf, terjadi kesalahan pada sistem AI.';
  }
}

const GUIDE_MESSAGE = `
🤖 *Selamat datang di ChatBot AI WhatsApp!*

Untuk menggunakan fitur AI cerdas ini, cukup ketik pesan dengan awalan *AI* di awal kalimat.

Contoh perintah:
- AI Siapa Club bola terbaik sepanjang sejarah?
- AI Buatkan motivasi untuk belajar setiap hari
- AI Jelaskan perbedaan antara HTTP dan HTTPS
- AI Ceritakan lelucon lucu tentang programmer

---

ChatBot AI ini dikembangkan oleh *Muhammad Syauqi Murtadlo* 🚀
`;

app.get('/', (req, res) => res.send('Server WhatsApp AI berjalan!'));

app.post('/ai', async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ reply: "Parameter 'message' wajib diisi." });
  }
  try {
    const reply = await aiHandler(req.body.message);
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ reply: 'Maaf, terjadi error di server.' });
  }
});

client.on('qr', (qr) => qrcode.generate(qr, { small: true }));
client.once('ready', () => console.log('WhatsApp client is ready!'));

client.on('disconnected', (reason) => {
  console.warn('WhatsApp client disconnected:', reason);
  client.initialize();
});

client.on('message_create', async (msg) => {
  try {
    if (msg.from.endsWith('@g.us')) return;
    if (msg.fromMe) return;

    const text = msg.body.trim();

    if (text.startsWith('AI')) {
      const prompt = text.replace(/^\AI\s*/, '');
      if (!prompt) {
        return await msg.reply('Pesan setelah AI tidak boleh kosong!');
      }
      const reply = await aiHandler(prompt);
      await msg.reply(reply);
    } else {
      await msg.client.sendMessage(msg.from, GUIDE_MESSAGE);
    }
  } catch (e) {
    console.error('Error saat handle pesan WhatsApp:', e);
    await msg.reply('Maaf, terjadi kesalahan internal.');
  }
});

client.initialize();

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
