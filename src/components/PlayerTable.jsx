import PlayerRow from './PlayerRow';

function PlayerTable({ players }) {
  return (
    <table className="player-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Número</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Nombre</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Posición</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Edad</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Puntos</th>
          <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Equipo</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </tbody>
    </table>
  );
}

export default PlayerTable;