import { useEffect } from 'react';

export default function PlayerLobby({
  nickname = 'Carlos_Dev',
  pin = '482 915',
}) {
  useEffect(() => {
    // AQUÍ CONECTARÁS TU SOCKET.IO EN EL FUTURO:
    // socket.on('gameStarted', () => {
    //   // Redirigir automáticamente a la pantalla /player/game
    //   window.location.href = '/player/game';
    // });
    // return () => socket.off('gameStarted');
  }, []);

  return (
    <div className='player-lobby-container'>
      {/* Información de la Sala en la parte superior */}
      <header className='player-lobby-header'>
        <span className='room-pin-badge'>PIN: {pin}</span>
      </header>

      {/* Contenido Central */}
      <main className='player-lobby-main'>
        {/* Avatar temporal o icono de carga animado */}
        <div className='loader-wrapper'>
          <div className='pulse-circle'></div>
          <span className='avatar-icon'>🎮</span>
        </div>

        <h1 className='welcome-name'>¡Estás dentro, {nickname}!</h1>
        <p className='waiting-text'>¿Ves tu nombre en la pantalla grande?</p>

        <div className='status-box'>
          <div className='small-spinner'></div>
          <span>Esperando que el profesor inicie...</span>
        </div>
      </main>

      {/* Consejos/Tips en la parte inferior para entretener */}
      <footer className='player-lobby-footer'>
        <p className='tip-title'>💡 Tip de juego:</p>
        <p className='tip-text'>
          ¡Responder correctamente y más rápido te dará muchos más puntos!
        </p>
      </footer>
    </div>
  );
}
