// src/components/RegistroDispositivo.tsx
import { useState } from "react";
import api from "../config/axios";
import { isAxiosError } from "axios";

export default function RegistroDispositivo() {
    const [macAddress, setMacAddress] = useState("");
    const [name, setName] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const registrar = async () => {
        setMensaje("");

        try {
            const res = await api.post("/api/devices/register", { macAddress, name });
            setMensaje(res.data.message || "Dispositivo registrado con éxito.");
            setMacAddress("");
            setName("");
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                setError(err.response.data.message)
            }
        };
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Registrar Dispositivo</h2>

            <label className="block text-sm font-medium text-gray-700">MAC Address</label>
            <input
                type="text"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                placeholder="C8:3A:35:13:AA:21"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700">Nombre del dispositivo</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cuna de mi bebé"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <button
                onClick={registrar}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
            >
                Registrar
            </button>

            {mensaje && <p className="text-green-600 text-center mt-4">{mensaje}</p>}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
    );
}