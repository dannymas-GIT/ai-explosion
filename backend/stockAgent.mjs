import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function analyzeStockData() {
  const stocks = await prisma.stock.findMany();

  for (const stock of stocks) {
    const newsArticles = await fetchNewsArticles(stock.symbol);
    const analysis = await analyzeNewsArticles(stock.symbol, newsArticles);
    const recommendation = generateRecommendation(analysis);

    // Store the recommendation in the database or send it to the user
    console.log(`Recommendation for ${stock.symbol}:`, recommendation);
  }
}

async function fetchNewsArticles(symbol) {
  const response = await axios.get(`https://newsapi.org/v2/everything?q=${symbol}&apiKey=${NEWS_API_KEY}`);
  return response.data.articles.slice(0, 5); // Get the first 5 articles
}

async function analyzeNewsArticles(symbol, articles) {
  const prompt = `Analyze the following news articles about ${symbol} and provide a summary of the key points and sentiment:

${articles.map(article => `Title: ${article.title}\nDescription: ${article.description}\n`).join('\n')}

Summary:`;

  const response = await axios.post(
    'https://api.openai.com/v1/engines/text-davinci-002/completions',
    {
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].text.trim();
}

function generateRecommendation(analysis) {
  // Implement your recommendation logic here based on the analysis
  // This is a simplified example
  if (analysis.toLowerCase().includes('positive')) {
    return 'Buy';
  } else if (analysis.toLowerCase().includes('negative')) {
    return 'Sell';
  } else {
    return 'Hold';
  }
}

export { analyzeStockData };