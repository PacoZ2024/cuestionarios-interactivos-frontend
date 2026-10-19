const TOKEN_KEY = 'token';

export function setTokenLocalStorage(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getTokenLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeTokenLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
}
