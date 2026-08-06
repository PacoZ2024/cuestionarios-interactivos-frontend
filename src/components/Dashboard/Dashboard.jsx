import { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('list'); // 'list' o 'create'
  const [quizzes, setQuizzes] = useState([
    { id: '1', title: 'Historia Universal 101', questionsCount: 10 },
    { id: '2', title: 'Quiz de Programación MERN', questionsCount: 5 },
  ]);

  // Estados del Formulario de Creación
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);

  // --- LÓGICA DE ELIMINACIÓN ---

  // 1. Eliminar cuestionario de la lista principal
  const handleDeleteQuiz = (id) => {
    if (
      window.confirm('¿Estás seguro de que deseas eliminar este cuestionario?')
    ) {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    }
  };

  // 2. Eliminar una pregunta específica dentro del creador
  const handleDeleteQuestionField = (indexToRemove) => {
    if (questions.length === 1) {
      alert('El cuestionario debe tener al menos una pregunta.');
      return;
    }
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  // --- LÓGICA DE EDICIÓN DINÁMICA ---
  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: 0 },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = oIndex;
    setQuestions(updated);
  };

  // --- PERSISTENCIA TEMPORAL ---
  const handleSaveQuiz = (e) => {
    e.preventDefault();
    const newQuiz = {
      id: Date.now().toString(),
      title: quizTitle,
      questionsCount: questions.length,
    };
    setQuizzes([...quizzes, newQuiz]);
    // Resetear el formulario
    setQuizTitle('');
    setQuestions([
      { questionText: '', options: ['', '', '', ''], correctAnswer: 0 },
    ]);
    setView('list');
  };

  const handleLaunchGame = (id) => {
    console.log('Lanzando partida en vivo para el quiz ID:', id);
    // Aquí conectarás con Express y Socket.io para abrir la sala
  };

  // Añade esta función de limpieza antes del return
  const handleLogout = () => {
    if (window.confirm('¿Quieres cerrar sesión?')) {
      // 1. Aquí borras el token de autenticación (Ej: localStorage.removeItem('token'))
      // 2. Rediriges al inicio o al login
      window.location.href = '/login';
    }
  };

  return (
    <div className='dash-container'>
      {/* Barra de Navegación Lateral */}
      <aside className='dash-sidebar'>
        <h2 className='dash-logo'>
          Klon<span>oot!</span>
        </h2>
        <nav className='dash-menu'>
          <button
            className={`menu-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            Mis Quizzes
          </button>
          <button
            className={`menu-btn ${view === 'create' ? 'active' : ''}`}
            onClick={() => setView('create')}
          >
            + Crear Quiz
          </button>
        </nav>

        {/* SECCIÓN ACTUALIZADA CON EL BOTÓN */}
        <div className='sidebar-footer'>
          <p className='user-role'>Panel del Profesor</p>
          <button className='btn-logout' onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal Dinámico */}
      <main className='dash-content'>
        {view === 'list' ? (
          /* VISTA: LISTA DE CUESTIONARIOS */
          <section className='view-section'>
            <div className='section-header'>
              <h1>Mis Cuestionarios</h1>
              <button
                className='btn-create-header'
                onClick={() => setView('create')}
              >
                Nuevo Quiz
              </button>
            </div>

            <div className='quiz-grid'>
              {quizzes.map((quiz) => (
                <div key={quiz.id} className='quiz-card'>
                  <div className='quiz-card-info'>
                    <h3>{quiz.title}</h3>
                    <p>{quiz.questionsCount} Preguntas</p>
                  </div>
                  <div className='quiz-card-actions'>
                    <button
                      className='btn-launch'
                      onClick={() => handleLaunchGame(quiz.id)}
                    >
                      🚀 Lanzar en Vivo
                    </button>
                    <button
                      className='btn-delete-quiz'
                      onClick={() => handleDeleteQuiz(quiz.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* VISTA: FORMULARIO CREADOR DE QUIZ */
          <section className='view-section'>
            <div className='section-header'>
              <h1>Crear Nuevo Cuestionario</h1>
              <button className='btn-cancel' onClick={() => setView('list')}>
                Cancelar
              </button>
            </div>

            <form onSubmit={handleSaveQuiz} className='quiz-form'>
              <div className='form-group-title'>
                <label>Título del Cuestionario</label>
                <input
                  type='text'
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder='Ej: Examen Sorpresa de JavaScript'
                  required
                />
              </div>

              <div className='questions-builder-list'>
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className='question-editor-card'>
                    <div className='question-card-header'>
                      <h4>Pregunta #{qIndex + 1}</h4>
                      <button
                        type='button'
                        className='btn-delete-question'
                        onClick={() => handleDeleteQuestionField(qIndex)}
                      >
                        ❌ Eliminar Pregunta
                      </button>
                    </div>

                    <input
                      type='text'
                      value={q.questionText}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, e.target.value)
                      }
                      placeholder='Escribe el enunciado de la pregunta aquí...'
                      className='input-question-text'
                      required
                    />

                    <div className='options-grid-editor'>
                      {q.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`option-editor-box color-${oIndex}`}
                        >
                          <input
                            type='radio'
                            name={`correct-${qIndex}`}
                            checked={q.correctAnswer === oIndex}
                            onChange={() =>
                              handleCorrectAnswerChange(qIndex, oIndex)
                            }
                            title='Marcar como respuesta correcta'
                          />
                          <input
                            type='text'
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            placeholder={`Opción ${oIndex + 1}`}
                            className='input-option-text'
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className='form-submit-actions'>
                <button
                  type='button'
                  className='btn-add-question'
                  onClick={addQuestionField}
                >
                  + Añadir otra pregunta
                </button>
                <button type='submit' className='btn-save-quiz'>
                  Guardar Cuestionario Completo
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
