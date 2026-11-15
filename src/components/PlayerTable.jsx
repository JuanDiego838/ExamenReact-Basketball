import PlayerRow from './PlayerRow';

function PlayerTable({ players, rowColors, onSort, sortConfig, favorites, onToggleFavorite }) {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : '↕';
  };

  return (
    <table className="player-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>⭐</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => onSort('id')}>Número {getSortIcon('id')}</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => onSort('nombre')}>Nombre {getSortIcon('nombre')}</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Posición</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => onSort('edad')}>Edad {getSortIcon('edad')}</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd', cursor: 'pointer' }} onClick={() => onSort('puntos')}>Puntos {getSortIcon('puntos')}</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Equipo</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <PlayerRow 
            key={player.id} 
            player={player} 
            index={index} 
            rowColors={rowColors} 
            isFavorite={favorites.includes(player.id)} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;