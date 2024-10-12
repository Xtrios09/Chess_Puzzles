const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const PORT = process.env.PORT || 3000;

// Route to fetch a random puzzle
app.get('/puzzle', async (req, res) => {
  try {
    const response = await axios.get('https://lichess.org/api/puzzle/random');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch puzzle' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
