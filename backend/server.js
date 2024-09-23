const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { AccessToken } = import('livekit-server-sdk'); // Ensure this is declared only once

const app = express();

// Middleware
app.use(cors({
  origin: ['https://app.ai-explosion.com', 'https://ai-explosion.com']
}));
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

// Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received chat message:', message);
    console.log('OpenAI API Key:', OPENAI_API_KEY.substring(0, 5) + '...'); // Log first 5 characters of API key

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('OpenAI API response:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.choices && response.data.choices[0]) {
      res.json(response.data.choices[0].message);
    } else {
      throw new Error('Unexpected response structure from OpenAI API');
    }
  } catch (error) {
    console.error('Error in chat API:', error.response ? error.response.data : error.message);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    res.status(500).json({ error: 'An error occurred while processing your request.', details: error.message });
  }
});

app.post('/api/livekit/token', (req, res) => {
  const { identity } = req.body;
  const at = new AccessToken('YOUR_LIVEKIT_CLOUD_API_KEY', 'YOUR_LIVEKIT_CLOUD_API_SECRET', {
    identity,
  });
  at.addGrant({ roomJoin: true, room: 'my-room' });
  const token = at.toJwt();
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
