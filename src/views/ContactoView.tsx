import React, { useState, useEffect } from "react";

const Contacto: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");


  const [info, setInfo] = useState({
    ubicacion: "",
    direccion: "",
    telefono: "",
    horarioSemana: "",
    horarioFin: "",
  });

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/info");
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Error al obtener información:", error);
      }
    };

    obtenerInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = { nombre, correo, mensaje };

    try {
      const response = await fetch("http://localhost:3001/api/mensajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        alert("Mensaje enviado correctamente!");
        setNombre("");
        setCorreo("");
        setMensaje("");
      } else {
        const errorData = await response.json();
        alert(`Error al enviar mensaje: ${errorData.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un error al intentar enviar el mensaje. Verifica tu conexión o el estado del servidor.");
    }
  };

  return (
    <div className="relative  flex flex-col justify-center items-center pt-20 bg-cover bg-center text-white">
      <div className="bg-white p-8 shadow-lg rounded-lg flex max-w-4xl w-full">
        {/* Sección Información */}
        <div className="w-1/2 pr-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contacto</h2>
          <p className="text-gray-600 text-lg">📍 Ubicación: {info.ubicacion}</p>
          <p className="text-gray-600 text-lg">📍 Dirección: {info.direccion}</p>
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Teléfono</h2>
          <p className="text-gray-600 text-lg">📞 {info.telefono}</p>
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Horario</h2>
          <p className="text-gray-600 text-lg">🕒 {info.horarioSemana}</p>
          <p className="text-gray-600 text-lg">🕒 {info.horarioFin}</p>
        </div>

        {/* Sección del Formulario */}
        <div className="w-1/2 bg-gray-100 p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Tu Correo"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <textarea
              placeholder="Escribe tu mensaje"
              rows={4}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-black"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md transition hover:bg-blue-700"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;