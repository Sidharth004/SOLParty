// server.js


import express from 'express';
import sqlite3 from 'sqlite3';
import fetch from 'node-fetch';

globalThis.fetch = fetch

const app = express();
app.use(express.json()); 

const db = new sqlite3.Database('./database.sqlite');

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  threshold NUMBER
)`);

// Route to handle new user threshold
app.post('/users', (req, res) => {
  const { id, threshold } = req.body;

  db.run('INSERT INTO users VALUES (?, ?)', [id, threshold], err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Threshold created!');
  });
});

// Route to check SOL price vs threshold
app.get('/sol-check', async (req, res) => {
  const { id } = req.params;

  const user = await getUser(id); // Fetch from DB

  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';
  
  const solPrice = await fetch(apiUrl)
    .then(res => res.json())
    .then(data => data.solana.usd);
  
  if (solPrice > user.threshold) {
    res.send({ message: 'SOL price is up!' }); 
  } else {
    res.send({ message: 'SOL price is down...' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Helper function to get user from DB
function getUser(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', id, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
}