function PlayerRow({ player, index, rowColors, isFavorite, onToggleFavorite, onClick }) {
  let bgColor = 'transparent';
  if (rowColors === 'pares' && index % 2 === 0) bgColor = '#e3fde6';
  if (rowColors === 'impares' && index % 2 !== 0) bgColor = '#ffe0e0';

  return (
    <tr 
      className="player-row" 
      style={{ backgroundColor: bgColor, cursor: 'pointer' }} 
      onClick={onClick} // <--- Recibe el clic para abrir el modal
    >
      <td>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); // <--- Evita que al hacer clic en la estrella se abra el modal
            onToggleFavorite(player.id); 
          }} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </td>
      <td>{player.id}</td>
      <td>{player.nombre}</td>
      <td>{player.posicion}</td>
      <td>{player.edad}</td>
      <td>{player.puntos}</td>
      <td>{player.equipo}</td>
    </tr>
  );
}

export default PlayerRow;
