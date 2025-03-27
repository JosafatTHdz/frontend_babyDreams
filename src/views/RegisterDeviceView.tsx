// 📄 src/pages/RegisterDevice.tsx

import { useState } from "react";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterDevice() {
  const [macAddress, setMacAddress] = useState("");
  const [name, setName] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registrar = async () => {
    setMensaje("");
    setError("");

    const macRegex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i;
    if (!macRegex.test(macAddress)) {
      setError("Formato de dirección MAC inválido.");
      return;
    }

    try {
      const res = await api.post("/device/register", { macAddress, name });
      toast.success(res.data.message);
      setMacAddress("");
      setName("");
      setTimeout(() => navigate("/admin/device"), 1500); // redirige luego de registrar
    } catch (err) {
      if (isAxiosError(err) && err.response)
        setError(err.response?.data?.message || "Error al registrar.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Registrar Nuevo Dispositivo
        </h1>

        <div className="mb-4">
          <input
            type="text"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
            placeholder="MAC Address (ej: C8:3A:35:13:AA:21)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del dispositivo"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          onClick={registrar}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Registrar
        </button>

        {mensaje && <p className="text-green-600 mt-3 text-sm">{mensaje}</p>}
        {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
}
