function PlayerRow({ player }) {
  return (
    <tr className="player-row">
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