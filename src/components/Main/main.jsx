import { useState } from 'react';

export default function Inicio() {
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const [step, setStep] = useState(1); // Paso 1: PIN, Paso 2: Nickname

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.trim().length === 6) {
      // Aquí validarías el PIN con Socket.io o tu API Express
      setStep(2); // Avanza al paso del Nickname si el PIN existe
    }
  };

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      // Aquí emites el evento de unirse a la sala vía Sockets
      console.log('Uniendo al juego:', { pin, nickname });
    }
  };

  return (
    <div className='home-container'>
      {/* Encabezado del Proyecto */}
      <header className='home-header'>
        <h1 className='home-logo'>
          Klon<span className='logo-accent'>oot!</span>
        </h1>
        <p className='home-subtitle'>Aprendizaje en tiempo real</p>
      </header>

      {/* Tarjeta Central de Acceso */}
      <main className='home-card'>
        {step === 1 ? (
          /* PASO 1: INGRESAR EL PIN DEL JUEGO */
          <form onSubmit={handlePinSubmit} className='home-form'>
            <input
              type='text'
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} // Solo números
              placeholder='PIN de Juego'
              className='input-pin'
              required
            />
            <button type='submit' className='btn-primary'>
              Ingresar
            </button>
          </form>
        ) : (
          /* PASO 2: INGRESAR EL NICKNAME */
          <form onSubmit={handleJoinGame} className='home-form'>
            <p className='pin-entered-badge'>PIN: {pin}</p>
            <input
              type='text'
              maxLength={15}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder='Tu Nickname / Apodo'
              className='input-nickname'
              required
              autoFocus
            />
            <button type='submit' className='btn-success'>
              ¡Listo para Jugar!
            </button>
          </form>
        )}
      </main>

      {/* Acceso para Profesores */}
      <footer className='home-footer'>
        <p>¿Eres docente?</p>
        <a href='/login' className='btn-teacher-link'>
          Crear o lanzar un cuestionario
        </a>
      </footer>
    </div>
  );
}
