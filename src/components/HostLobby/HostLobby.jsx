import { useState, useEffect } from 'react';

export default function HostLobby() {
  const [pin] = useState('482 915'); // En producción, esto vendrá del backend
  const [quizTitle] = useState('Quiz de Programación MERN'); // Título del juego lanzado
  const [players, setPlayers] = useState([
    'Carlos_Dev',
    'Ana_MERN',
    'Profe_Fan',
    'Juan_JS',
    'Laura_React',
  ]); // Lista temporal de alumnos conectados

  useEffect(() => {
    // AQUÍ CONECTARÁS TU SOCKET.IO EN EL FUTURO:
    // socket.on('playerJoined', (name) => {
    //   setPlayers((prev) => [...prev, name]);
    // });
    // return () => socket.off('playerJoined');
  }, []);

  const handleStartGame = () => {
    console.log('Iniciando la primera pregunta para la sala:', pin);
    // Aquí emites el evento por sockets para cambiar de pantalla a todos
  };

  return (
    <div className='lobby-container'>
      {/* Barra superior de información */}
      <header className='lobby-header'>
        <div className='quiz-info'>
          <span className='badge-live'>EN VIVO</span>
          <h1>{quizTitle}</h1>
        </div>
        <button
          className='btn-start-game'
          disabled={players.length === 0}
          onClick={handleStartGame}
        >
          ¡Empezar Juego! 🚀
        </button>
      </header>

      {/* Bloque Gigante de Acceso */}
      <section className='lobby-hero'>
        <div className='hero-text'>
          <h2>Entra a la aplicación e ingresa el PIN:</h2>
          <div className='pin-display'>{pin}</div>
        </div>
        <div className='counter-box'>
          <span className='counter-number'>{players.length}</span>
          <span className='counter-label'>Jugadores</span>
        </div>
      </section>

      {/* Cuadrícula de Jugadores Conectados */}
      <main className='lobby-players-section'>
        {players.length === 0 ? (
          <div className='empty-lobby'>
            <div className='spinner'></div>
            <p>Esperando a que se unan los alumnos...</p>
          </div>
        ) : (
          <div className='players-grid'>
            {players.map((player, index) => (
              <div key={index} className='player-tag'>
                {player}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
