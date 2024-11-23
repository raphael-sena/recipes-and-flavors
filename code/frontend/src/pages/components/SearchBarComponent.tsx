// components/SearchBarComponent.tsx
import React, { useState } from 'react';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';

interface SearchBarComponentProps {
  onSearch: (query: string) => void;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // todo!
  const handleFilter = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center mb-2 space-x-4 bg-darkBlue p-3 rounded-2xl w-full mx-auto lg:w-80">
        <button
        onClick={handleSearch}
        className="p-2 text-white rounded-lg focus:outline-none"
      >
        <IoIosSearch />
      </button>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyUp={handleKeyPress}
        placeholder="Buscar..."
        className="w-full p-2 border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-blue "
      />
      
      {/* TODO */}
        <button
        onClick={handleFilter}
        className="p-2 text-white rounded-lg focus:outline-none"
      >
        <IoIosMenu />
      </button>
    </div>
  );
};

export default SearchBarComponent;
