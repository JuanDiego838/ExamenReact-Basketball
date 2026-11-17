function Pagination({ currentPage, totalPages, onPageChange, darkMode }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Colores dinámicos
  const activeBg = darkMode ? '#2196f3' : '#ddd';
  const activeColor = darkMode ? '#fff' : '#000';
  const normalBg = darkMode ? '#333' : 'white';
  const normalColor = darkMode ? '#fff' : '#000';
  const borderColor = darkMode ? '#555' : '#ccc';

  return (
    <div className="pagination" style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} style={{ padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Primera</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Anterior</button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ 
            padding: '5px 10px', 
            fontWeight: currentPage === page ? 'bold' : 'normal', 
            backgroundColor: currentPage === page ? activeBg : normalBg, 
            color: currentPage === page ? activeColor : normalColor,
            border: `1px solid ${borderColor}`, 
            cursor: 'pointer' 
          }}
        >
          {page}
        </button>
      ))}
      
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Siguiente</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} style={{ padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Última</button>
    </div>
  );
}

export default Pagination;