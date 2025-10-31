import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;

pool.connect()
  .then(client => {
    console.log("✅ Conexão com o banco estabelecida com sucesso!");
    client.release();
  })
  .catch(err => {
    console.error("❌ Erro ao conectar no banco:", err.message);
  });
