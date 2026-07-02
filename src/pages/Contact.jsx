import { useState } from "react";
import Button from "../components/Button";
import { sendContactMessage } from "../services/contactService";

const initialForm = {
  name: "",
  email: "",
  subject: "consulta",
  message: "",
};

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email)) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (form.message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-trace-400">
        Contacto
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-mist-100">
        ¿Dudas sobre compatibilidad? Escríbenos.
      </h1>
      <p className="mt-2 text-sm text-mist-500">
        Cuéntanos tu placa madre y procesador, te ayudamos a elegir el kit
        correcto.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-mist-300">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-graphite-600 bg-graphite-900 px-4 py-2.5 text-mist-100 placeholder:text-mist-500 focus:border-trace-500"
            placeholder="Ej. Carla Mendoza"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-amber-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-mist-300">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-graphite-600 bg-graphite-900 px-4 py-2.5 text-mist-100 placeholder:text-mist-500 focus:border-trace-500"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-amber-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="font-mono text-xs uppercase tracking-wider text-mist-300">
            Motivo
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-graphite-600 bg-graphite-900 px-4 py-2.5 text-mist-100 focus:border-trace-500"
          >
            <option value="consulta">Consulta de compatibilidad</option>
            <option value="garantia">Garantía</option>
            <option value="mayorista">Compra mayorista</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-mist-300">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-graphite-600 bg-graphite-900 px-4 py-2.5 text-mist-100 placeholder:text-mist-500 focus:border-trace-500"
            placeholder="Placa madre, procesador y capacidad que buscas..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-amber-400">{errors.message}</p>
          )}
        </div>

        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </Button>

        {status === "success" && (
          <p className="font-mono text-sm text-trace-400">
            Mensaje enviado. Te responderemos a la brevedad.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-sm text-amber-400">
            No se pudo enviar el mensaje. Verifica que JSON Server esté activo
            e inténtalo de nuevo.
          </p>
        )}
      </form>
    </div>
  );
}
