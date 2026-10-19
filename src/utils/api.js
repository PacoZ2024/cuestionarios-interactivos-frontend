class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async _request(endpoint, method = 'GET', body = null) {
    const config = { method, headers: this._headers };

    // Solo añade el body si el método no es GET y si hay datos que enviar
    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    return await fetch(`${this._baseUrl}${endpoint}`, { ...config }).then(
      (res) => this._checkResponse(res),
    );
  }

  addAuthorizationToHeader(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // 1. Obtener la lista de cuestionarios disponibles creados por el usuario (Panel inicial)
  getQuizzes() {
    return this._request('quizzes');
  }

  // 2. Crear una nueva sala/partida de juego a partir de un cuestionario (Host/Profesor)
  crearPartida(quizId) {
    return this._request('partidas', 'POST', { quizId });
  }

  // 3. Unirse a una sala de juego usando el PIN (Jugador/Alumno)
  unirseAPartida(pin, nickname) {
    return this._request(`partidas/${pin}/unirse`, 'POST', { nickname });
  }

  // 4. Enviar la respuesta seleccionada por un jugador
  enviarRespuesta(pin, playerId, preguntaId, opcionSeleccionada) {
    return this._request(`partidas/${pin}/responder`, 'POST', {
      playerId,
      preguntaId,
      opcion: opcionSeleccionada,
    });
  }

  // 5. Obtener los resultados actuales/tabla de posiciones (Leaderboard)
  obtenerResultados(pin) {
    return this._request(`partidas/${pin}/resultados`);
  }
}

const api = new Api({
  baseUrl:
    import.meta.env.MODE === 'production'
      ? 'https://tu-kahoot-produccion.com'
      : 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
