// src/components/PokemonSearch.tsx

import React, { useState } from 'react';

interface PokemonSearchProps {
  onSearch: (query: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onClear: () => void;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({
  onSearch,
  isLoading,
  error,
  onClear
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      await onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && query.trim()) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-4 md:mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search Pokémon by name or ID..."
            className="w-full px-4 py-2 md:py-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700 text-sm md:text-base"
            disabled={isLoading}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Searching...
            </>
          ) : (
            <>
              🔍 Search Pokémon
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-start">
            <div className="text-red-500 mr-2">⚠️</div>
            <div>
              <p className="text-red-700 font-medium">Search Error</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Tips */}
      {!isLoading && !error && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            💡 Try searching: "pikachu", "charizard".
          </p>
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;