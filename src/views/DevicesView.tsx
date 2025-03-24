// 🌟 Vista mejorada y elegante para la gestión de dispositivos

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import api from '../config/axios';
import { isAxiosError } from 'axios';
import { Device } from '../types/device';
import { useNavigate } from 'react-router-dom';

function FormRegistroDispositivo({ onRegistrado }: { onRegistrado: () => void }) {
  const [macAddress, setMacAddress] = useState('');
  const [name, setName] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const registrar = async () => {
    setMensaje('');
    setError('');

    const macRegex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i;
    if (!macRegex.test(macAddress)) {
      setError('Formato de dirección MAC inválido.');
      return;
    }

    try {
      const res = await api.post('/device/register', { macAddress, name });
      setMensaje(res.data.message || 'Dispositivo registrado.');
      setMacAddress('');
      setName('');
      onRegistrado();
    } catch (err) {
      if (isAxiosError(err) && err.response)
        setError(err.response?.data?.message || 'Error al registrar.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Vincular nuevo dispositivo</h3>

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
  );
}

export default function MisDispositivos() {
  const navigate = useNavigate();
  const { data: dispositivos, isLoading, refetch } = useQuery({
    queryKey: ['userDevices'],
    queryFn: () => api.get('/device/mine').then((res) => res.data),
  });

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Mis Dispositivos</h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando dispositivos...</p>
        ) : dispositivos.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Aún no tienes dispositivos vinculados.</p>
            <FormRegistroDispositivo onRegistrado={refetch} />
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {dispositivos.map((d: Device) => (
                <li key={d._id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-3 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">{d.name}</h3>
                    <p className="text-sm text-gray-500">MAC: {d.macAddress}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/control/${d._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
                  >
                    Ver Panel
                  </button>
                </li>
              ))}
            </ul>

            <FormRegistroDispositivo onRegistrado={refetch} />
          </>
        )}
      </div>
    </div>
  );
}
