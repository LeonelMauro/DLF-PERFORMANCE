
const API = 'http://localhost:3000';

export const createUser = (user) =>
  fetch(`${API}/user`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => console.error('Error al crear el usuario:', error));
