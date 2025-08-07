
import React from 'react';
import { Pokemon } from '../types/pokemon';
import { formatPokemonName, getPokemonTypes, getTypeColor } from '../utils/pokemonApi';

interface TeamSidebarProps {
  team: Pokemon[];
  onRemoveFromTeam: (pokemonId: number) => void;
}

const TeamSidebar: React.FC<TeamSidebarProps> = ({ team, onRemoveFromTeam }) => {
  const maxTeamSize = 6;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 h-fit sticky top-4">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
        My Team ({team.length}/{maxTeamSize})
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${(team.length / maxTeamSize) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {team.length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <div className="text-gray-400 text-3xl md:text-4xl mb-2">⚪</div>
            <p className="text-gray-500 text-sm md:text-base">No Pokémon in team</p>
            <p className="text-xs md:text-sm text-gray-400">Search and add Pokémon!</p>
          </div>
        ) : (
          team.map((pokemon) => {
            const types = getPokemonTypes(pokemon);
            return (
              <div
                key={pokemon.id}
                className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50"
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={formatPokemonName(pokemon.name)}
                  className="w-12 h-12 object-contain flex-shrink-0"
                />

                {/* Pokemon Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-800 truncate">
                    {formatPokemonName(pokemon.name)}
                  </h4>
                  <div className="flex gap-1 mt-1">
                    {types.slice(0, 2).map((type, index) => (
                      <span
                        key={index}
                        className={`px-1.5 py-0.5 rounded text-xs font-medium text-white ${getTypeColor(type)}`}
                      >
                        {type.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromTeam(pokemon.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold flex-shrink-0 p-1"
                  title="Remove from team"
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>

      {team.length >= maxTeamSize && (
        <div className="mt-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
          Team is full! Remove a Pokémon to add a new one.
        </div>
      )}

      {team.length < maxTeamSize && (
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: maxTeamSize - team.length }).map((_, index) => (
              <div
                key={index}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400 text-xs">Empty</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSidebar;