
import { useCallback, useState } from 'react';
import { Pokemon } from '../types/pokemon';
import { PokemonApiError, searchPokemon } from '../utils/pokemonApi';
import { toast } from 'react-toastify';
export const usePokemon = () => {
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTeam, setCurrentTeam] = useState<Pokemon[]>([]);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a Pokémon name or ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const pokemon = await searchPokemon(query.trim());
      setSearchResult(pokemon);
    } catch (err) {
      if (err instanceof PokemonApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResult(null);
    setError(null);
    setIsLoading(false);
  }, []);


  const addToTeam = (pokemon: Pokemon) => {
    if (currentTeam.length >= 6) {
      toast.error('Team is full! You can only have 6 Pokémon in your team.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const isDuplicate = currentTeam.some(teamPokemon => teamPokemon.id === pokemon.id);
    if (isDuplicate) {
      toast.warning('This Pokémon is already in your team!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setCurrentTeam(prev => [...prev, pokemon]);
    const message = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} added to your team!`;
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const removeFromTeam = (pokemonId: number) => {
    const pokemon = currentTeam.find(p => p.id === pokemonId);
    setCurrentTeam(prev => prev.filter(pokemon => pokemon.id !== pokemonId));

    if (pokemon) {
      const message = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} removed from your team!`;
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const isInTeam = (pokemonId: number): boolean => {
    return currentTeam.some(pokemon => pokemon.id === pokemonId);
  };




  return {
    searchResult,
    isLoading,
    error,
    search,
    clearSearch,
    currentTeam,
    isInTeam,
    addToTeam,
    removeFromTeam
  };
};