const express = require('express');

const axios = require('axios');

const cors = require('cors');

const path = require('path');

const fs = require('fs');

require('dotenv').config();


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


app.get('/api/search', async (req, res) => {

  try {

    const { query } = req.query;

    console.log('Received search query:', query);

    const response = await axios.post('https://api.tavily.com/search', {

      api_key: TAVILY_API_KEY,

      query: query,

      include_summary: true,

    });

    console.log('Tavily API response:', response.data);

    res.json(response.data);

  } catch (error) {

    console.error('Error in search API:', error.response ? error.response.data : error.message);

    console.error('Full error object:', error);

    res.status(500).json({ error: 'An error occurred while processing your request.' });

  }

});


app.get('/api/test-tavily', async (req, res) => {

  try {

    const response = await axios.post('https://api.tavily.com/search', {

      api_key: TAVILY_API_KEY,

      query: 'test query',

      include_summary: true,

    });

    res.json({ message: 'Tavily API test successful', data: response.data });

  } catch (error) {

    console.error('Tavily API test failed:', error.response ? error.response.data : error.message);

    res.status(500).json({ error: 'Tavily API test failed', details: error.message });

  }

});


// Serve static files from /var/www/ai-explosion

const staticPath = '/var/www/ai-explosion';


if (fs.existsSync(path.join(staticPath, 'index.html'))) {

  console.log(`Serving React app from: ${staticPath}`);

  app.use(express.static(staticPath));


  app.get('*', (req, res) => {

    res.sendFile(path.join(staticPath, 'index.html'));

  });

} else {

  console.warn('React app files not found in /var/www/ai-explosion. Only API routes will be available.');

}


// Start the server

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);

  if (!fs.existsSync(path.join(staticPath, 'index.html'))) {

    console.log('API routes:');

    console.log('  POST /api/chat');

    console.log('  GET /api/search');

    console.log('  GET /api/test-tavily');

  }

});
