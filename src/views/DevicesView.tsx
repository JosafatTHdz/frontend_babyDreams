import { useQuery } from '@tanstack/react-query';
import api from '../config/axios';
import { Device } from '../types/device';
import { useNavigate } from 'react-router-dom';

export default function MisDispositivos() {
  const navigate = useNavigate();
  const { data: dispositivos, isLoading } = useQuery({
    queryKey: ['userDevices'],
    queryFn: () => api.get('/device/mine').then((res) => res.data),
  });

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Mis Dispositivos</h1>
          <button
            onClick={() => navigate('/register-device')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition"
          >
            + Registrar nuevo dispositivo
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando dispositivos...</p>
        ) : dispositivos.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Aún no tienes dispositivos vinculados.</p>
            {/* <FormRegistroDispositivo onRegistrado={refetch} /> */}
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

            {/* <FormRegistroDispositivo onRegistrado={refetch} /> */}
          </>
        )}
      </div>
    </div>
  );
}
