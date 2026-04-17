
const ws = require('ws');
const { neonConfig, Client } = require('@neondatabase/serverless');

neonConfig.webSocketConstructor = ws;

async function testConnection() {
  const connectionString = 'postgresql://neondb_owner:npg_4jQOmv9LnWuF@ep-rapid-lab-aik8o2pi-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
  const client = new Client(connectionString);
  try {
    await client.connect();
    console.log('✅ Successfully connected to the database!');
    const res = await client.query('SELECT NOW()');
    console.log('Database time:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
}

testConnection();
