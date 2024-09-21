import React, { useState } from 'react';

import axios from 'axios';


interface SearchResult {

  title: string;

  snippet: string;

  url: string;

}


const SearchComponent: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [aiResponse, setAiResponse] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = async () => {

    setIsLoading(true);

    try {

      console.log('Initiating search for:', searchTerm);

      

      // Tavily search

      console.log('Calling Tavily search API...');

      const tavilyResponse = await axios.get(`https://app.ai-explosion.com/api/search`, {

        params: { query: searchTerm }

      });

      console.log('Tavily search response:', tavilyResponse.data);

      setSearchResults(tavilyResponse.data.results || []);


      // LLM chat for response

      console.log('Calling chat API...');

      const responseChat = await axios.post('https://app.ai-explosion.com/api/chat', {

        message: searchTerm,

      });

      console.log('Chat API response:', responseChat.data);

      setAiResponse(responseChat.data.response || 'No response available.');

    } catch (error) {

      console.error('Error in handleSearch:', error);

      if (axios.isAxiosError(error)) {

        console.error('Error details:', error.response ? error.response.data : error.message);

      }

      setAiResponse('An error occurred while processing your request.');

    }

    setIsLoading(false);

  };


  return (

    <div className="search-component">

      <div className="search-input-container">

        <textarea

          value={searchTerm}

          onChange={(e) => setSearchTerm(e.target.value)}

          placeholder="Enter your search query"

          rows={4}

        />

        <button onClick={handleSearch} disabled={isLoading}>

          {isLoading ? 'Searching...' : 'Search'}

        </button>

      </div>

      <div className="ai-search-benefits">

        <p>

          AI-powered search enhances your query with intelligent analysis, 

          providing more accurate and relevant results. It combines web data 

          with AI-generated insights for a comprehensive understanding of your topic.

        </p>

      </div>

      <div className="search-results-container">

        <div className="ai-response">

          <p>{aiResponse}</p>

        </div>

        <div className="search-results">

          {searchResults.map((result, index) => (

            <div key={index} className="search-result">

              <h4>{result.title}</h4>

              <p>{result.snippet}</p>

              <a href={result.url} target="_blank" rel="noopener noreferrer">Read more</a>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}


export default SearchComponent;
