import { useState, useEffect, useMemo } from 'react';
import { players } from './data/players.js';
import SearchBar from './components/SearchBar';
import PlayerTable from './components/PlayerTable';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredPlayers = useMemo(() => {
    if (!debouncedSearch) return players;
    return players.filter(p => 
      p.nombre.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  return (
    <div className="app-container">
      <h1>Examen React - Basketball 🏀</h1>
      
      {/* Aquí llamamos a los componentes */}
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
        resultsCount={filteredPlayers.length}
      />

      <PlayerTable players={filteredPlayers} />
    </div>
  );
}

export default App;