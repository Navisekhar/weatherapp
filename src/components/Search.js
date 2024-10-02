import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery(''); // Clear the input field after search
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter city name"
        className="p-2 rounded-lg w-full border-2 md:w-1/2"
      />
      <button type="submit" className="p-2 ml-2 bg-blue-500 text-white rounded-lg">
        Search
      </button>
    </form>
  );
};

export default Search;
