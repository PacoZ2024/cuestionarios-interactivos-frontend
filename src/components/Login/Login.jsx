import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Aquí realizarás el fetch hacia tu endpoint (ej: /api/auth/login)
      console.log('Iniciando sesión con:', formData);

      // Simulación de autenticación exitosa
      setTimeout(() => {
        setLoading(false);
        // Aquí guardarías el token JWT en localStorage y redirigirías al /dashboard
        alert('¡Inicio de sesión correcto! Redirigiendo...');
      }, 1200);
    } catch (err) {
      setError('Credenciales incorrectas o el usuario no existe.');
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-header'>
          <h2 className='login-logo'>
            Klon<span>oot!</span>
          </h2>
          <p className='login-subtitle'>Ingresa a tu panel de Profesor</p>
        </div>

        {error && <div className='login-error-msg'>{error}</div>}

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-field'>
            <label>Correo Electrónico</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='correo@institucion.com'
              required
            />
          </div>

          <div className='form-field'>
            <label>Contraseña</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Introduce tu contraseña'
              required
            />
          </div>

          <button type='submit' className='btn-login-submit' disabled={loading}>
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className='login-footer'>
          ¿Aún no tienes cuenta?{' '}
          <a href='/register' className='register-link'>
            Regístrate como docente
          </a>
        </div>
      </div>
    </div>
  );
}
