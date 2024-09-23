import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://app.ai-explosion.com', 'https://ai-explosion.com', 'http://localhost:3000']
}));
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;

// Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received chat message:', message);

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

    if (response.data && response.data.choices && response.data.choices[0]) {
      res.json(response.data.choices[0].message);
    } else {
      throw new Error('Unexpected response structure from OpenAI API');
    }
  } catch (error) {
    console.error('Error in chat API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.', details: error.message });
  }
});

app.post('/api/livekit/token', async (req, res) => {
  console.log('Received request for LiveKit token');
  const { room } = req.body;
  if (!room) {
    console.log('Room name is missing');
    return res.status(400).json({ error: 'Room name is required' });
  }

  try {
    if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
      console.log('LiveKit API key or secret is missing');
      throw new Error('LiveKit API key or secret is missing');
    }

    console.log('Generating token for room:', room);
    console.log('Using API Key:', LIVEKIT_API_KEY);
    console.log('Using API Secret:', LIVEKIT_API_SECRET.substring(0, 5) + '...');

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: `user-${Date.now()}`,
    });
    at.addGrant({ roomJoin: true, room, roomCreate: true });

    const token = await at.toJwt();
    console.log('Generated token:', token);
    res.json({ token });
  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    res.status(500).json({ error: 'Failed to generate token', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('LiveKit API Key:', LIVEKIT_API_KEY ? 'Set' : 'Not set');
  console.log('LiveKit API Secret:', LIVEKIT_API_SECRET ? 'Set' : 'Not set');
});