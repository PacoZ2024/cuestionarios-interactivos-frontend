import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';
import { api } from '../../utils/api';
import { setTokenLocalStorage } from '../../utils/token';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }

    await auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setTimeout(() => {
            setLoading(false);
            api.addAuthorizationToHeader(data.token);
            setTokenLocalStorage(data.token);
            const redirectPath = location.state?.from?.pathname || '/dashboard';
            navigate(redirectPath);
            alert('¡Inicio de sesión correcto! Redirigiendo...');
          }, 1200);
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Credenciales incorrectas o el usuario no existe.');
        setLoading(false);
      });
  }

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

    handleLogin(formData);
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
