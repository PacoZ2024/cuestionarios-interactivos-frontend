import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Validación básica en Frontend
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // Aquí harás tu llamada fetch al backend (ej: /api/auth/register)
      console.log('Enviando datos al backend:', formData);

      // Simulación de éxito
      setTimeout(() => {
        setLoading(false);
        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
      }, 1500);
    } catch (err) {
      setError('Hubo un problema con el servidor. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-card'>
        <div className='register-header'>
          <h2 className='register-logo'>
            Klon<span>oot!</span>
          </h2>
          <p className='register-subtitle'>Crea tu cuenta de Profesor</p>
        </div>

        {error && <div className='register-error-msg'>{error}</div>}

        <form onSubmit={handleSubmit} className='register-form'>
          <div className='form-field'>
            <label>Nombre Completo</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Ej: Profe Juan Pérez'
              required
            />
          </div>

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
              placeholder='Mínimo 6 caracteres'
              required
            />
          </div>

          <div className='form-field'>
            <label>Confirmar Contraseña</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Repite tu contraseña'
              required
            />
          </div>

          <button
            type='submit'
            className='btn-register-submit'
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse como Docente'}
          </button>
        </form>

        <div className='register-footer'>
          ¿Ya tienes cuenta?{' '}
          <a href='/login' className='login-link'>
            Inicia sesión aquí
          </a>
        </div>
      </div>
    </div>
  );
}
