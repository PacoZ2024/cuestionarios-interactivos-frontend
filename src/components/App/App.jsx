import { Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider } from '../../context/SocketContext';

import Main from '../Main/Main';
import Dashboard from '../Dashboard/Dashboard';
import HostLobby from '../HostLobby/HostLobby';
import HostGame from '../HostGame/HostGame';
import PlayerLobby from '../PlayerLobby/PlayerLobby';
import PlayerGame from '../PlayerGame/PlayerGame';
import Login from '../Login/Login';
import Register from '../Register/Register';

export default function App() {
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
        <Route path='/dashboard' element={<Dashboard />} />

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
