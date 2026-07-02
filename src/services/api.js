// URL base de JSON Server.
// En desarrollo local: json-server --watch db.json --port 3001
export const API_URL = "http://localhost:3001";

/**
 * Envoltorio simple sobre fetch para centralizar el manejo de errores
 * y evitar repetir try/catch en cada servicio.
 */
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo completar la solicitud a ${path}`);
  }

  // Las peticiones DELETE de json-server no siempre devuelven contenido
  if (response.status === 204) return null;

  return response.json();
}
