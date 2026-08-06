import { useState, useEffect } from 'react';

export default function PlayerGame() {
  // Estados posibles: 'voting' | 'feedback'
  const [gameState, setGameState] = useState('voting');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [pointsGained, setPointsGained] = useState(0);

  useEffect(() => {
    // AQUÍ CONECTARÁS TU SOCKET.IO EN EL FUTURO:
    // Escuchar cuando el profesor cambia de pregunta o termina el tiempo:
    // socket.on('timeOver', ({ correctOptionIndex }) => { ... });
    // socket.on('nextQuestionReady', () => {
    //   setGameState('voting');
    //   setHasAnswered(false);
    // });
  }, []);

  const handleSelectAnswer = (optionIndex) => {
    if (hasAnswered) return; // Evita que responda dos veces

    setHasAnswered(true);

    // SIMULACIÓN DE RESPUESTA (Esto se enviará al backend mediante Sockets)
    console.log('Alumno seleccionó la opción:', optionIndex);

    // Simulamos que el backend procesa la respuesta e indica que fue CORRECTA (ej: opción 3)
    const indexCorrectoSimulado = 3;
    const alumnoAcerto = optionIndex === indexCorrectoSimulado;

    setTimeout(() => {
      setIsCorrect(alumnoAcerto);
      setPointsGained(alumnoAcerto ? 920 : 0); // Puntos calculados por velocidad
      setGameState('feedback');
    }, 1000); // Retardo simulando respuesta del servidor
  };

  return (
    <div className='player-game-container'>
      {/* RENDERIZADO CONDICIONAL POR ESTADOS */}

      {gameState === 'voting' ? (
        /* --- ESTADO 1: PANEL DE VOTACIÓN (4 BOTONES GIGANTES) --- */
        <div className='voting-layout'>
          {hasAnswered ? (
            <div className='waiting-block'>
              <div className='pulse-loader'></div>
              <h2>Respuesta enviada...</h2>
              <p>Espera a que termine el tiempo en la pantalla principal</p>
            </div>
          ) : (
            <div className='answers-button-grid'>
              <button
                className='answer-btn btn-red'
                onClick={() => handleSelectAnswer(0)}
              >
                <span className='shape-icon'>▲</span>
              </button>
              <button
                className='answer-btn btn-blue'
                onClick={() => handleSelectAnswer(1)}
              >
                <span className='shape-icon'>◆</span>
              </button>
              <button
                className='answer-btn btn-yellow'
                onClick={() => handleSelectAnswer(2)}
              >
                <span className='shape-icon'>■</span>
              </button>
              <button
                className='answer-btn btn-green'
                onClick={() => handleSelectAnswer(3)}
              >
                <span className='shape-icon'>●</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* --- ESTADO 2: RETROALIMENTACIÓN (RESULTADO) --- */
        <div
          className={`feedback-layout ${isCorrect ? 'bg-correct' : 'bg-incorrect'}`}
        >
          <div className='feedback-content'>
            <span className='feedback-emoji'>{isCorrect ? '🎉' : '❌'}</span>
            <h1 className='feedback-title'>
              {isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </h1>

            <div className='score-badge'>
              <span className='score-number'>+{pointsGained}</span>
              <span className='score-label'>Puntos</span>
            </div>

            <p className='footer-waiting-text'>
              Espera a la siguiente pregunta...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
