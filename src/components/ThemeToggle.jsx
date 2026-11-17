function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button 
      onClick={onToggle} 
      style={{ 
        marginBottom: '20px', 
        padding: '8px 12px', 
        cursor: 'pointer',
        backgroundColor: darkMode ? '#555' : '#fff',
        color: darkMode ? '#fff' : '#000',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}
    >
      {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
}

export default ThemeToggle;