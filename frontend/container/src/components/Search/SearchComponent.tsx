import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Tavily search
      const tavilyResponse = await axios.get(`http://localhost:3001/api/search`, {
        params: { query: searchTerm }
      });
      setSearchResults(tavilyResponse.data.results || []);

      // LLM chat for response
      const responseChat = await axios.post('http://localhost:3001/api/chat', {
        message: searchTerm,
      });
      setAiResponse(responseChat.data.content || 'No response available.');
    } catch (error) {
      console.error('Error during search or chat:', error.response ? error.response.data : error.message);
      setAiResponse('Error: Unable to generate response.');
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
};

export default SearchComponent;
