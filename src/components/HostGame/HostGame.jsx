import { useState, useEffect } from 'react';

export default function HostGame() {
  // Fases posibles: 'question' | 'stats' | 'leaderboard'
  const [phase, setPhase] = useState('question');
  const [timeLeft, setTimeLeft] = useState(20);
  const [answersCount, setAnswersCount] = useState(0);

  // Datos simulados de la pregunta actual (Vendrán del servidor MERN)
  const currentQuestion = {
    text: '¿Cuál de las siguientes tecnologías NO forma parte de la pila MERN?',
    options: ['MongoDB', 'Express', 'React', 'Angular'],
    correctAnswer: 3, // Índice de 'Angular'
  };

  // Datos simulados de estadísticas de respuesta
  const statsData = {
    distribution: 1, // Cuántos votaron por cada opción
    totalPlayers: 18,
  };

  // Datos simulados del podio parcial (Top 5)
  const leaderboardData = [
    { nickname: 'Ana_MERN', score: 950 },
    { nickname: 'Carlos_Dev', score: 890 },
    { nickname: 'Juan_JS', score: 720 },
    { nickname: 'Laura_React', score: 680 },
    { nickname: 'Profe_Fan', score: 510 },
  ];

  // Lógica del temporizador para la fase de pregunta
  useEffect(() => {
    if (phase !== 'question' || timeLeft === 0) {
      if (timeLeft === 0 && phase === 'question') setPhase('stats');
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, phase]);

  // Simulación de alumnos respondiendo en tiempo real
  useEffect(() => {
    if (phase === 'question' && answersCount < statsData.totalPlayers) {
      const interval = setInterval(() => {
        setAnswersCount((prev) => {
          if (prev >= statsData.totalPlayers - 3) {
            clearInterval(interval);
            return statsData.totalPlayers;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleNext = () => {
    if (phase === 'question') {
      setPhase('stats');
    } else if (phase === 'stats') {
      setPhase('leaderboard');
    } else {
      // Avanzar a la siguiente pregunta del backend
      setPhase('question');
      setTimeLeft(20);
      setAnswersCount(0);
    }
  };

  return (
    <div className='host-game-container'>
      {/* Barra superior de control */}
      <header className='game-header'>
        <span className='question-indicator'>Pregunta 3 de 10</span>
        <button className='btn-next-phase' onClick={handleNext}>
          {phase === 'question'
            ? 'Omitir ⏭️'
            : phase === 'stats'
              ? 'Ver Podio 🏆'
              : 'Siguiente ➡️'}
        </button>
      </header>

      {/* RENDERIZADO CONDICIONAL POR FASES */}

      {phase === 'question' && (
        <div className='phase-question-layout'>
          <h1 className='question-title'>{currentQuestion.text}</h1>

          <div className='game-status-row'>
            <div className='timer-circle'>
              <span className='timer-num'>{timeLeft}</span>
            </div>
            <div className='answers-counter'>
              <span className='counter-num'>{answersCount}</span>
              <span className='counter-label'>Respuestas</span>
            </div>
          </div>

          <div className='options-grid-display'>
            {currentQuestion.options.map((option, idx) => (
              <div key={idx} className={`option-display-box color-${idx}`}>
                <span className='option-shape'>
                  {idx === 0 ? '▲' : idx === 1 ? '◆' : idx === 2 ? '■' : '●'}
                </span>
                <p className='option-text'>{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'stats' && (
        <div className='phase-stats-layout'>
          <h1 className='question-title-reduced'>{currentQuestion.text}</h1>
          <h2 className='phase-subtitle'>Resultados de la Pregunta</h2>

          <div className='chart-container'>
            {currentQuestion.options.map((option, idx) => {
              const count = statsData.distribution[idx];
              const percentage =
                statsData.totalPlayers > 0
                  ? (count / statsData.totalPlayers) * 100
                  : 0;
              const isCorrect = idx === currentQuestion.correctAnswer;

              return (
                <div key={idx} className='chart-bar-wrapper'>
                  <div className='bar-count'>{count}</div>
                  <div
                    className={`chart-bar color-${idx} ${isCorrect ? 'correct-glow' : 'incorrect-fade'}`}
                    style={{ height: `${Math.max(percentage, 8)}%` }}
                  >
                    {isCorrect && <span className='correct-check'>✓</span>}
                  </div>
                  <div className='bar-label'>{option}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {phase === 'leaderboard' && (
        <div className='phase-leaderboard-layout'>
          <h1 className='leaderboard-title'>🏆 Tabla de Posiciones 🏆</h1>
          <div className='leaderboard-list'>
            {leaderboardData.map((player, idx) => (
              <div key={idx} className={`leaderboard-item position-${idx + 1}`}>
                <div className='player-rank'>#{idx + 1}</div>
                <div className='player-name'>{player.nickname}</div>
                <div className='player-score'>{player.score} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
