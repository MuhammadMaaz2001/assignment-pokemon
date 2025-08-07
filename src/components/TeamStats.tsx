

import React from 'react';
import { Pokemon, TeamStats } from '../types/pokemon';
import { getPokemonTypes, getTypeColor } from '../utils/pokemonApi';

interface TeamStatsProps {
  team: Pokemon[];
}

const TeamStatsComponent: React.FC<TeamStatsProps> = ({ team }) => {
  // Calculate team statistics
  const calculateTeamStats = (team: Pokemon[]): TeamStats => {
    if (team.length === 0) {
      return {
        totalTypes: [],
        averageBaseExperience: 0,
        totalPokemon: 0
      };
    }

    // Get unique types
    const allTypes = team.flatMap(pokemon => getPokemonTypes(pokemon));
    const uniqueTypes = [...new Set(allTypes)];

    // Calculate average base experience
    const totalBaseExperience = team.reduce((sum, pokemon) => {
      return sum + (pokemon.base_experience || 0);
    }, 0);
    const averageBaseExperience = Math.round(totalBaseExperience / team.length);

    return {
      totalTypes: uniqueTypes,
      averageBaseExperience,
      totalPokemon: team.length
    };
  };

  const stats = calculateTeamStats(team);

  if (team.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Team Statistics</h3>
        <div className="text-center py-6 text-gray-500">
          <div className="text-3xl mb-2">📊</div>
          <p>Add Pokémon to see team stats</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Team Statistics</h3>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalPokemon}
          </div>
          <div className="text-sm text-blue-800">
            Pokémon
          </div>
        </div>


        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.totalTypes.length}
          </div>
          <div className="text-sm text-green-800">
            Unique Types
          </div>
        </div>


        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {stats.averageBaseExperience}
          </div>
          <div className="text-sm text-purple-800">
            Avg. Base Exp
          </div>
        </div>
      </div>


      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Type Coverage:</h4>
        {stats.totalTypes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {stats.totalTypes.sort().map((type) => (
              <span
                key={type}
                className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(type)}`}
              >
                {type.toUpperCase()}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No types covered</p>
        )}
      </div>


      {stats.totalTypes.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> Having diverse types helps cover more weaknesses and provides better battle coverage!
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamStatsComponent;