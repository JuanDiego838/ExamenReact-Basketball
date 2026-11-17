import { useEffect } from 'react';

function Modal({ player, onClose, darkMode }) {
  // Efecto para que se pueda cerrar con la tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!player) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)', // Overlay semitransparente
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro de la tarjeta
        style={{
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
          padding: '30px', 
          borderRadius: '10px', 
          minWidth: '300px', 
          maxWidth: '500px',
          position: 'relative',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.3s ease-in-out' // Animación suave
        }}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', top: '10px', right: '10px', 
            cursor: 'pointer', background: 'none', border: 'none', 
            fontSize: '1.5rem', color: 'inherit' 
          }}
        >
          &times;
        </button>
        
        <h2 style={{ marginTop: 0 }}>Detalles del Jugador</h2>
        <hr style={{ margin: '10px 0', borderColor: darkMode ? '#555' : '#ddd' }} />
        
        <p><strong>Nombre:</strong> {player.nombre}</p>
        <p><strong>Posición:</strong> {player.posicion}</p>
        <p><strong>Edad:</strong> {player.edad} años</p>
        <p><strong>Puntos:</strong> {player.puntos}</p>
        <p><strong>Equipo:</strong> {player.equipo}</p>
      </div>
    </div>
  );
}

export default Modal;