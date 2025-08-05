const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'BarberFlow Chatbot',
    timestamp: new Date().toISOString()
  });
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.json({ message: 'Webhook received' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 BarberFlow Chatbot running on port ${PORT}`);
});

module.exports = app;
