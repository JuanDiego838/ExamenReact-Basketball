function SearchHistory({ history, onSelectSearch, onClearHistory, darkMode }) {
  if (history.length === 0) return null;

  // Colores dinámicos
  const bgColor = darkMode ? '#333' : '#f9f9f9';
  const textColor = darkMode ? '#fff' : '#333';
  const borderColor = darkMode ? '#555' : '#ddd';
  const btnBg = darkMode ? '#444' : '#fff';

  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: bgColor, color: textColor, borderRadius: '5px', border: `1px solid ${borderColor}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <strong>Últimas búsquedas:</strong>
        <button 
          onClick={onClearHistory} 
          style={{ padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px', transition: 'background-color 0.2s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#cc0000'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff4d4d'}
        >
          Limpiar historial
        </button>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {history.map((term, index) => (
          <button 
            key={index} 
            onClick={() => onSelectSearch(term)}
            className="history-btn"
            style={{ 
              padding: '5px 10px', 
              cursor: 'pointer', 
              borderRadius: '15px', 
              border: `1px solid ${borderColor}`, 
              backgroundColor: btnBg,
              color: textColor
            }}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;