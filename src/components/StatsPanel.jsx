function StatsPanel({ players, darkMode }) {
  if (players.length === 0) return (
    <div style={{ padding: '15px', backgroundColor: darkMode ? '#333' : '#f9f9f9', color: darkMode ? '#fff' : '#333', borderRadius: '8px', marginBottom: '20px' }}>
      <p style={{ margin: 0 }}>No hay jugadores para mostrar estadísticas.</p>
    </div>
  );

  const total = players.length;
  const avgAge = (players.reduce((acc, p) => acc + p.edad, 0) / total).toFixed(1);
  const topScorer = players.reduce((max, p) => p.puntos > max.puntos ? p : max, players[0]);
  
  const positions = players.reduce((acc, p) => {
    acc[p.posicion] = (acc[p.posicion] || 0) + 1;
    return acc;
  }, {});

  // Colores dinámicos para Modo Oscuro
  const bgCard1 = darkMode ? '#1e3a5f' : '#e3f2fd';
  const bgCard2 = darkMode ? '#4a3b22' : '#fff3e0';
  const textColor = darkMode ? '#fff' : '#333';
  const barBg = darkMode ? '#555' : '#ddd';

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
      
      <div style={{ flex: 1, padding: '15px', backgroundColor: bgCard1, borderRadius: '8px', color: textColor }}>
        <h3 style={{ margin: '0 0 10px 0' }}>📊 Resumen</h3>
        <p><strong>Total Jugadores:</strong> {total}</p>
        <p><strong>Promedio de Edad:</strong> {avgAge} años</p>
        <p><strong>Máximo Anotador:</strong> {topScorer.nombre} ({topScorer.puntos} pts)</p>
      </div>

      <div style={{ flex: 1, padding: '15px', backgroundColor: bgCard2, borderRadius: '8px', color: textColor }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🏀 Distribución por Posición</h3>
        {Object.entries(positions).map(([pos, count]) => (
          <div key={pos} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '2px' }}>
              <span>{pos}</span>
              <span>{count}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: barBg, borderRadius: '4px', height: '8px' }}>
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