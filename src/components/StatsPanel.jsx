function StatsPanel({ players }) {
  if (players.length === 0) return <p>No hay jugadores para mostrar estadísticas.</p>;

  const total = players.length;
  const avgAge = (players.reduce((acc, p) => acc + p.edad, 0) / total).toFixed(1);
  const topScorer = players.reduce((max, p) => p.puntos > max.puntos ? p : max, players[0]);
  
  const positions = players.reduce((acc, p) => {
    acc[p.posicion] = (acc[p.posicion] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
      
      <div style={{ flex: 1, padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', color: '#333' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>📊 Resumen</h3>
        <p><strong>Total Jugadores:</strong> {total}</p>
        <p><strong>Promedio de Edad:</strong> {avgAge} años</p>
        <p><strong>Máximo Anotador:</strong> {topScorer.nombre} ({topScorer.puntos} pts)</p>
      </div>

      <div style={{ flex: 1, padding: '15px', backgroundColor: '#fff3e0', borderRadius: '8px', color: '#333' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🏀 Distribución por Posición</h3>
        {Object.entries(positions).map(([pos, count]) => (
          <div key={pos} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '2px' }}>
              <span>{pos}</span>
              <span>{count}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '4px', height: '8px' }}>
              <div style={{ 
                width: `${(count / total) * 100}%`, 
                backgroundColor: '#ff9800', 
                height: '100%', 
                borderRadius: '4px' 
              }}></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StatsPanel;