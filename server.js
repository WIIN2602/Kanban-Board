require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("🔍 กำลังพยายามเชื่อมต่อฐานข้อมูลด้วยค่าต่อไปนี้:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS ? "HIDDEN" : "NOT SET",
  port: process.env.DB_PORT,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('✅ เชื่อมต่อ PostgreSQL สำเร็จ!'))
  .catch(err => {
    console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err);
  });

app.listen(5000, () => console.log('🚀 เซิร์ฟเวอร์กำลังทำงานที่พอร์ต 5000'));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
