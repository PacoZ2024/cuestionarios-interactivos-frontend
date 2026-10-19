import { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('list'); // 'list', 'create' o 'edit'
  const [editingQuizId, setEditingQuizId] = useState(null); // ID del quiz en edición
  const [quizzes, setQuizzes] = useState([
    { 
      id: '1', 
      title: 'Historia Universal 101', 
      questionsCount: 2,
      questions: [
        { questionText: '¿En qué año comenzó la Segunda Guerra Mundial?', options: ['1939', '1945', '1914', '1989'], correctAnswer: 0 },
        { questionText: '¿Quién pintó la Mona Lisa?', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Monet'], correctAnswer: 1 }
      ]
    },
    { 
      id: '2', 
      title: 'Quiz de Programación MERN', 
      questionsCount: 1,
      questions: [
        { questionText: '¿Qué significa la M en MERN?', options: ['MySQL', 'MongoDB', 'Mongoose', 'Meteor'], correctAnswer: 1 }
      ]
    },
  ]);

  // Estados del Formulario (Compartidos entre Creación y Edición)
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);

  // --- LÓGICA DE NAVEGACIÓN Y CARGA ---
  const handleOpenCreateMode = () => {
    setEditingQuizId(null);
    setQuizTitle('');
    setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    setView('create');
  };

  const handleOpenEditMode = (quiz) => {
    setEditingQuizId(quiz.id);
    setQuizTitle(quiz.title);
    // Clonamos las preguntas para evitar mutaciones directas en el estado
    setQuestions(JSON.parse(JSON.stringify(quiz.questions || [{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }])));
    setView('edit');
  };

  // --- LÓGICA DE ELIMINACIÓN ---
  const handleDeleteQuiz = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cuestionario?')) {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    }
  };

  const handleDeleteQuestionField = (indexToRemove) => {
    if (questions.length === 1) {
      alert('El cuestionario debe tener al menos una pregunta.');
      return;
    }
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  // --- LÓGICA DE EDICIÓN DINÁMICA DE PREGUNTAS ---
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

  // --- PROCESAMIENTO DE GUARDADO (CREAR / EDITAR) ---
  const handleSaveQuiz = (e) => {
    e.preventDefault();

    if (view === 'edit' && editingQuizId) {
      // Modo Edición: Actualizar cuestionario existente
      setQuizzes(quizzes.map((quiz) => {
        if (quiz.id === editingQuizId) {
          return {
            ...quiz,
            title: quizTitle,
            questionsCount: questions.length,
            questions: questions
          };
        }
        return quiz;
      }));
    } else {
      // Modo Creación: Añadir nuevo cuestionario
      const newQuiz = {
        id: Date.now().toString(),
        title: quizTitle,
        questionsCount: questions.length,
        questions: questions
      };
      setQuizzes([...quizzes, newQuiz]);
    }

    // Limpieza de estados y regreso a la lista
    setQuizTitle('');
    setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    setEditingQuizId(null);
    setView('list');
  };

  const handleLaunchGame = (id) => {
    console.log('Lanzando partida en vivo para el quiz ID:', id);
  };

  const handleLogout = () => {
    if (window.confirm('¿Quieres cerrar sesión?')) {
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
            onClick={handleOpenCreateMode}
          >
            + Crear Quiz
          </button>
        </nav>

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
                onClick={handleOpenCreateMode}
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
                      🚀 Lanzar
                    </button>
                    <button
                      className='btn-edit-quiz'
                      onClick={() => handleOpenEditMode(quiz)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className='btn-delete-quiz'
                      onClick={() => handleDeleteQuiz(quiz.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* VISTA: FORMULARIO CREADOR / EDITOR DE QUIZ */
          <section className='view-section'>
            <div className='section-header'>
              <h1>{view === 'edit' ? 'Editar Cuestionario' : 'Crear Nuevo Cuestionario'}</h1>
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
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      placeholder='Escribe el enunciado de la pregunta aquí...'
                      className='input-question-text'
                      required
                    />

                    <div className='options-grid-editor'>
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className={`option-editor-box color-${oIndex}`}>
                          <input
                            type='radio'
                            name={`correct-${qIndex}`}
                            checked={q.correctAnswer === oIndex}
                            onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                            title='Marcar como respuesta correcta'
                          />
                          <input
                            type='text'
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
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
                  {view === 'edit' ? 'Guardar Cambios' : 'Guardar Cuestionario Completo'}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
