

import { Pokemon } from '../types/pokemon';

const POKEAPI_BASE_URL = (import.meta as any).env.VITE_POKEAPI_BASE_URL;

export class PokemonApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PokemonApiError';

    
  }
}

export const searchPokemon = async (nameOrId: string): Promise<Pokemon> => {
  try {

    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new PokemonApiError(`Pokémon "${nameOrId}" not found`);
      }
      throw new PokemonApiError(`Failed to fetch Pokémon: ${response.statusText}`);
    }
    
    const pokemon: Pokemon = await response.json();
    return pokemon;
  } catch (error) {
    if (error instanceof PokemonApiError) {
      throw error;
    }
    throw new PokemonApiError('Network error occurred while searching for Pokémon');
  }
};

export const getPokemonImageUrl = (pokemon: Pokemon): string => {
  return pokemon.sprites.other['official-artwork'].front_default || 
         pokemon.sprites.front_default || 
         '/placeholder-pokemon.png';
};

export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getPokemonTypes = (pokemon: Pokemon): string[] => {
  return pokemon.types.map(type => type.type.name);
};

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  
  return typeColors[type] || 'bg-gray-400';
};