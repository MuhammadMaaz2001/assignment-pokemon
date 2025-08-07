
import React from 'react';
import { Pokemon } from '../types/pokemon';
import { getPokemonImageUrl, formatPokemonName, getPokemonTypes, getTypeColor } from '../utils/pokemonApi';

interface PokemonCardProps {
  pokemon: Pokemon;
  onAddToTeam?: () => void;
  onRemoveFromTeam?: () => void;
  isInTeam?: boolean;
  showAddButton?: boolean;
}





const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onAddToTeam,
  onRemoveFromTeam,
  isInTeam = false,
  showAddButton = true
}) => {
  const types = getPokemonTypes(pokemon);

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">

      <div className="flex justify-center mb-3 md:mb-4">
        <div className="relative">
          <img
            src={getPokemonImageUrl(pokemon)}
            alt={formatPokemonName(pokemon.name)}
            className="w-20 h-20 md:w-24 md:h-24 object-contain transition-transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = pokemon.sprites.front_default || '/placeholder-pokemon.png';
            }}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {formatPokemonName(pokemon.name)}
        </h3>

      

        <div className="flex justify-center gap-2 mb-3">
          {types.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(type)}`}
            >
              {type.toUpperCase()}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Base Experience: <span className="font-semibold">{pokemon.base_experience || 'N/A'}</span>
        </p>

        {showAddButton && (
          <div className="space-y-2">
            {isInTeam ? (
              <button
                onClick={onRemoveFromTeam}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                ❌ Remove from Team
              </button>
            ) : (
              <button
                onClick={onAddToTeam}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                ➕ Add to Team
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;