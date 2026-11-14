function SearchBar({ value, onChange, onClear, resultsCount }) {
  return (
    <div className="search-bar" style={{ marginBottom: '20px' }}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar jugador por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '8px', width: '300px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      {value && (
        <button className="search-bar__clear" onClick={onClear} style={{ padding: '8px', cursor: 'pointer' }}>
          X
        </button>
      )}
      <p className="search-bar__count">Mostrando <strong>{resultsCount}</strong> resultados</p>
    </div>
  );
}

export default SearchBar;