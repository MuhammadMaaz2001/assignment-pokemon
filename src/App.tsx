
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar from './components/Navbar';
import PokemonCard from './components/PokemonCard';
import PokemonSearch from './components/PokemonSearch';
import TeamSidebar from './components/TeamSidebar';
import TeamStatsComponent from './components/TeamStats';
import { usePokemon } from './hooks/usePokemon';


function App() {
  const { searchResult, isLoading, error, search, clearSearch, addToTeam, isInTeam, removeFromTeam, currentTeam } = usePokemon();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Search Pokémon
              </h2>
              <PokemonSearch
                onSearch={search}
                isLoading={isLoading}
                error={error}
                onClear={clearSearch}
              />
            </div>
            {isLoading && (
              <LoadingSpinner />
            )}

            {searchResult && !isLoading && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                  Search Result
                </h2>
                <div className="max-w-sm mx-auto">
                  <PokemonCard
                    pokemon={searchResult}
                    onAddToTeam={() => addToTeam(searchResult)}
                    onRemoveFromTeam={() => removeFromTeam(searchResult.id)}
                    isInTeam={isInTeam(searchResult.id)}
                    showAddButton={true}
                  />
                </div>
              </div>
            )}
            <TeamStatsComponent team={currentTeam} />
          </div>

          <div className="lg:col-span-1">
            <TeamSidebar
              team={currentTeam}
              onRemoveFromTeam={removeFromTeam}
            />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;