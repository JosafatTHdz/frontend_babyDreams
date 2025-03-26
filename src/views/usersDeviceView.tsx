import { useQuery } from "@tanstack/react-query";
import api from "../config/axios";
import { Device } from "../types/device";
import { User } from "../types";

export default function UsuariosConDispositivos() {
    const { data: users, isLoading, isError } = useQuery<User[]>({
      queryKey: ["admin-users-with-devices"],
      queryFn: async () => {
        const res = await api.get("/admin/usuarios-dispositivos");
        return res.data;
      },
    });
  
    if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (isError) return <p className="text-center text-red-500">Error al cargar los datos.</p>;
  
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">Usuarios con Dispositivos Asignados</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-gray-800 text-left">
                <th className="px-4 py-3 border-b">Nombre</th>
                <th className="px-4 py-3 border-b">Correo</th>
                <th className="px-4 py-3 border-b">Dispositivos</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.devices.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {user.devices.map((device) => (
                          <li key={device._id}>
                            <span className="font-semibold">{device.name}</span> — {device.macAddress}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500 italic">Sin dispositivos</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }