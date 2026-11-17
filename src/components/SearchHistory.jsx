function SearchHistory({ history, onSelectSearch, onClearHistory }) {
  if (history.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px', border: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <strong>Últimas búsquedas:</strong>
        <button onClick={onClearHistory} style={{ padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px' }}>
          Limpiar historial
        </button>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {history.map((term, index) => (
          <button 
            key={index} 
            onClick={() => onSelectSearch(term)}
            style={{ padding: '5px 10px', cursor: 'pointer', borderRadius: '15px', border: '1px solid #ccc', backgroundColor: 'white' }}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;