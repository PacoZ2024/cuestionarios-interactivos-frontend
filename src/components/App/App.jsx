import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SocketProvider } from '../../context/SocketContext';

import Main from '../Main/Main';
import Dashboard from '../Dashboard/Dashboard';
import HostLobby from '../HostLobby/HostLobby';
import HostGame from '../HostGame/HostGame';
import PlayerLobby from '../PlayerLobby/PlayerLobby';
import PlayerGame from '../PlayerGame/PlayerGame';
import Login from '../Login/Login';
import Register from '../Register/Register';

import { api } from '../../utils/api';
import {
  getTokenLocalStorage,
  removeTokenLocalStorage,
} from '../../utils/token';
import * as auth from '../../utils/auth';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const navigate = useNavigate();

  async function handleSaveQuizzes(quiz) {
    await api
      .saveQuiz(quiz)
      .then((savedQuiz) => {
        setSavedQuizzes([...savedQuizzes, savedQuiz]);
      })
      .catch((err) => {
        console.error('Error al guardar el cuestionario:', err);
      });
  }

  function handleSignOut() {
    removeTokenLocalStorage();
    setIsLoggedIn(false);
    setSavedQuizzes([]);
    navigate('/');
  }

  useEffect(() => {
    const token = getTokenLocalStorage();

    if (!token) {
      return;
    }

    (async () => {
      await auth
        .checkToken(token)
        .then((data) => {
          console.log(data);
          api.addAuthorizationToHeader(token);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          removeTokenLocalStorage();
          setIsLoggedIn(false);
          console.error('Token inválido:', err);
        });
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn)
      (async () => {
        await api
          .getQuizzes()
          .then((data) => {
            setSavedQuizzes(data);
          })
          .catch((err) => console.error(err));
      })();
  }, [isLoggedIn]);

  return (
    <SocketProvider>
      <Routes>
        {/* --- RUTAS PÚBLICAS / ALUMNOS --- */}
        {/* Pantalla de inicio para ingresar el PIN */}
        <Route path='/' element={<Main />} />

        {/* Sala de espera del alumno (esperando al profesor) */}
        <Route path='/player/lobby' element={<PlayerLobby />} />

        {/* Pantalla de juego del alumno (botones de colores) */}
        <Route path='/player/game' element={<PlayerGame />} />

        {/* --- RUTAS DEL PROFESOR (HOST) --- */}
        {/* Pantalla de autenticación para el ingreso del profesor */}
        <Route path='/login' element={<Login />} />

        {/* Pantalla de registro para el profesor */}
        <Route path='/register' element={<Register />} />

        {/* Panel de administración y creador de quizzes */}
        <Route
          path='/dashboard'
          element={
            <Dashboard
              onSaveQuizzes={handleSaveQuizzes}
              savedQuizzes={savedQuizzes}
              onSignOut={handleSignOut}
            />
          }
        />

        {/* Proyector: Sala de espera con el PIN gigante */}
        <Route path='/host/lobby' element={<HostLobby />} />

        {/* Proyector: Pantalla de juego con preguntas y estadísticas */}
        <Route path='/host/game' element={<HostGame />} />

        {/* --- RUTA DE REDIRECCIÓN --- */}
        {/* Si el usuario escribe cualquier otra ruta, vuelve al inicio */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </SocketProvider>
  );
}
