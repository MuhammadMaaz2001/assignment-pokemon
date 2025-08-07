

export interface Pokemon {
  id: number;
  name: string;
  
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

export interface Team {
  id: string;
  name: string;
  pokemon: Pokemon[];
  createdAt: Date;
}

export interface TeamStats {
  totalTypes: string[];
  averageBaseExperience: number;
  totalPokemon: number;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  error: string | null;
  results: Pokemon | null;
}

export interface AppState {
  currentTeam: Pokemon[];
  searchState: SearchState;
}