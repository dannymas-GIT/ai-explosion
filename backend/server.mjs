import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: ['https://app.ai-explosion.com', 'https://ai-explosion.com', 'http://localhost:3000']
}));
app.use(express.json());

// Environment variables
const NEW_PORT = process.env.NEW_PORT || 5001; // New port for stock and auth features
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Existing routes...

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

// Get user's stocks
app.get('/api/stocks', authenticateToken, async (req, res) => {
  try {
    const stocks = await prisma.stock.findMany({
      where: { userId: req.user.userId },
    });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stocks' });
  }
});

// Add a stock
app.post('/api/stocks', authenticateToken, async (req, res) => {
  try {
    const { symbol } = req.body;
    const stockData = await fetchStockData(symbol);
    
    const stock = await prisma.stock.create({
      data: {
        symbol,
        price: stockData.price,
        change: stockData.change,
        userId: req.user.userId,
      },
    });
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Error adding stock' });
  }
});

// Remove a stock
app.delete('/api/stocks/:symbol', authenticateToken, async (req, res) => {
  try {
    await prisma.stock.delete({
      where: {
        symbol_userId: {
          symbol: req.params.symbol,
          userId: req.user.userId,
        },
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error removing stock' });
  }
});

// Function to fetch stock data from Alpha Vantage API
async function fetchStockData(symbol: string) {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const data = response.data['Global Quote'];
    return {
      price: parseFloat(data['05. price']),
      change: parseFloat(data['10. change percent'].replace('%', '')),
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

app.listen(NEW_PORT, () => {
  console.log(`New features server is running on port ${NEW_PORT}`);
});