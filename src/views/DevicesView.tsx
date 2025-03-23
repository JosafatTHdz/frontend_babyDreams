// src/components/MisDispositivos.tsx
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
      onRegistrado(); // recarga lista
    } catch (err) {
        if (isAxiosError(err) && err.response)
      setError(err.response?.data?.message || 'Error al registrar.');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl mt-6">
      <h3 className="text-lg font-semibold mb-3">Vincular nuevo dispositivo</h3>

      <input
        type="text"
        value={macAddress}
        onChange={(e) => setMacAddress(e.target.value)}
        placeholder="MAC Address (ej: C8:3A:35:13:AA:21)"
        className="w-full p-2 border rounded-md mb-3"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del dispositivo"
        className="w-full p-2 border rounded-md mb-3"
      />

      <button
        onClick={registrar}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Registrar
      </button>

      {mensaje && <p className="text-green-600 mt-2">{mensaje}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default function MisDispositivos() {
    const navigate = useNavigate()
  const { data: dispositivos, isLoading, refetch } = useQuery({
    queryKey: ['userDevices'],
    queryFn: () => api.get('/device/mine').then((res) => res.data),
  });

  console.log(dispositivos)
  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Mis Dispositivos</h1>

      {dispositivos.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-700 mb-4">Aún no tienes dispositivos vinculados.</p>
          <FormRegistroDispositivo onRegistrado={refetch} />
        </div>
      ) : (
        <>
          <ul className="bg-white shadow-md rounded-xl p-4">
            {dispositivos.map((d: Device) => (
              <li key={d._id} className="border-b py-2">
                <div>
                    <strong>{d.name}</strong> — {d.macAddress}
                </div>
                <button
                  onClick={() => navigate(`/admin/control/${d._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
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
  );
}
