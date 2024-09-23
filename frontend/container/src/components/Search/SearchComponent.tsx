import React, { useState } from 'react';

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <p className="ai-search-benefits">
        AI-powered search enhances your query with intelligent analysis,
        providing more accurate and relevant results. It combines web data
        with AI-generated insights for a comprehensive understanding of
        your topic.
      </p>
    </div>
  );
};

export default SearchComponent;
