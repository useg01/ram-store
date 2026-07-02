import { apiFetch } from "./api";

/** Envía un mensaje de contacto al recurso /messages de JSON Server */
export function sendContactMessage(payload) {
  return apiFetch("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
  });
}
