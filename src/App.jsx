import { useState, useEffect, useMemo } from 'react';
import { players } from './data/players.js';
import SearchBar from './components/SearchBar';
import PlayerTable from './components/PlayerTable';
import Pagination from './components/Pagination';
import SearchHistory from './components/SearchHistory';
import StatsPanel from './components/StatsPanel';
import Modal from './components/Modal';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

function App() {
  // 1. Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowColors, setRowColors] = useState('none');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
  });

  // Estado para el Modal
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const itemsPerPage = 5; 

  // 2. Efectos (useEffect)
  // Debounce para el buscador
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Resetear página al buscar o filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, showOnlyFavorites]);

  // Cerrar modal al cambiar de página o filtro
  useEffect(() => {
    setSelectedPlayer(null);
  }, [currentPage, debouncedSearch]);

  // Guardar preferencias en LocalStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Historial de búsquedas
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      setSearchHistory(prev => {
        const updated = [debouncedSearch, ...prev.filter(s => s !== debouncedSearch)];
        return updated.slice(0, 5);
      });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 3. Funciones
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  // 4. Cálculos (useMemo)
  const filteredPlayers = useMemo(() => {
    let result = players;
    if (showOnlyFavorites) {
      result = result.filter(p => favorites.includes(p.id));
    }
    if (debouncedSearch) {
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return result;
  }, [debouncedSearch, showOnlyFavorites, favorites]);

  const sortedPlayers = useMemo(() => {
    let sortableItems = [...filteredPlayers];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredPlayers, sortConfig]);

  // Paginación
  const totalPages = Math.ceil(sortedPlayers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirstItem, indexOfLastItem);

  // 5. Render (HTML)
  return (
    <div className="app-container">
      <h1>🏀 Tabla de Jugadores de Baloncesto 🏀</h1>
      
      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />

      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
        resultsCount={sortedPlayers.length}
      />

      <SearchHistory 
        history={searchHistory} 
        onSelectSearch={setSearchTerm} 
        onClearHistory={() => { setSearchHistory([]); localStorage.removeItem('searchHistory'); }} 
        darkMode={darkMode}
      />
      
      {/* Le pasamos darkMode a las estadísticas */}
      <StatsPanel players={sortedPlayers} darkMode={darkMode} />

      <label style={{ display: 'block', marginBottom: '10px' }}>
        <input type="checkbox" checked={showOnlyFavorites} onChange={() => setShowOnlyFavorites(!showOnlyFavorites)} />
        {' '}Mostrar solo favoritos ({favorites.length})
      </label>

      <div style={{ margin: '15px 0', display: 'flex', gap: '10px' }}>
        <button onClick={() => setRowColors('pares')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Pintar Pares</button>
        <button onClick={() => setRowColors('impares')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Pintar Impares</button>
        <button onClick={() => setRowColors('none')} style={{ padding: '8px 12px', cursor: 'pointer' }}>Limpiar Colores</button>
      </div>

      <PlayerTable 
        players={currentPlayers} 
        rowColors={rowColors} 
        onSort={requestSort} 
        sortConfig={sortConfig} 
        favorites={favorites} 
        onToggleFavorite={toggleFavorite} 
        onRowClick={setSelectedPlayer} 
      />

      {/* Le pasamos darkMode a la paginación */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          darkMode={darkMode}
        />
      )}

      {/* Modal de Detalles */}
      {selectedPlayer && (
        <Modal 
          player={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)} 
          darkMode={darkMode} 
        />
      )}
    </div>
  );
}

export default App;