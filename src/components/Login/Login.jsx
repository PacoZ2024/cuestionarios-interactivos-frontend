import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className='login-container'>
      {/* Logo / Título */}
      <h1 className='login-logo'>
        Klon<span className='logo-accent'>oot!</span>
      </h1>

      {/* Tarjeta de Login */}
      <div className='login-card'>
        <h2 className='card-title'>Panel de Creador</h2>

        <form onSubmit={handleSubmit} className='login-form'>
          {/* Email */}
          <div className='form-group'>
            <label className='form-label'>Correo Electrónico</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='ejemplo@correo.com'
              className='form-input'
              required
            />
          </div>

          {/* Contraseña */}
          <div className='form-group'>
            <label className='form-label'>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='form-input'
              required
            />
          </div>

          {/* Botón de Ingreso */}
          <button type='submit' className='form-button'>
            Iniciar Sesión
          </button>
        </form>

        {/* Links de ayuda */}
        <div className='card-footer'>
          ¿No tienes cuenta?{' '}
          <a href='#register' className='footer-link'>
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
}
