import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../config/axios';
import { useParams } from 'react-router-dom';

// 🔹 Obtener datos en tiempo real desde el backend
const fetchRealtimeData = async (deviceId: string) => {
    const { data } = await api.get(`/iot/realtime/${deviceId}`)
    return data;
};

const token = localStorage.getItem('token');


// 🔹 Tarjeta de Control para dispositivos IoT
interface TarjetaControlProps {
    titulo: string;
    descripcion: string;
    imagenEstatica: string;
    imagenAnimada: string;
    estado: boolean;
    setEstado: (estado: boolean) => void;
    puntoDeApi: string;
}

const TarjetaControl = ({ titulo, descripcion, imagenEstatica, imagenAnimada, estado, setEstado, puntoDeApi }: TarjetaControlProps) => {
    const alternarSwitch = () => {
        const nuevoEstado = !estado;
        console.log(`🔹 Cambiando estado de ${titulo}:`, nuevoEstado);
        setEstado(nuevoEstado);
    
        api.post(puntoDeApi, { estado: nuevoEstado }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(`Estado actualizado para ${titulo}:`, response.data);
        })
        .catch(error => {
            console.error(`Error cambiando el estado de ${titulo}:`, error);
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center w-80 h-80 transition-transform transform hover:scale-105 hover:shadow-2xl mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">{titulo}</h2>
            <p className="text-sm text-gray-600 mb-3">{descripcion}</p>
            <img 
                src={estado ? imagenAnimada : imagenEstatica} 
                alt={titulo} 
                className="w-24 h-24 object-cover mb-4 rounded-lg"
            />
            <div className="relative w-16 h-9">
                {/* Input funcional e invisible, con `peer` */}
                <input
                    type="checkbox"
                    checked={estado}
                    onChange={alternarSwitch}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer peer"
                />

                {/* Fondo del switch que cambia de color cuando está activado */}
                <div className="w-16 h-9 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-green-400"></div>

                {/* Círculo deslizante que se mueve cuando el switch está activado */}
                <div className="absolute left-1 top-1 w-7 h-7 bg-white rounded-full shadow-md transform transition duration-300 peer-checked:translate-x-7"></div>
            </div>
            <p className={`text-lg font-semibold mt-3 ${estado ? 'text-green-600' : 'text-red-600'}`}>
                {estado ? 'Encendido' : 'Apagado'}
            </p>
        </div>
    );
};

export default function ControlCuna() {
    // 🔹 React Query para obtener datos en tiempo real
    // 🔹 Obtener deviceId de los parámetros de la URL
    const { deviceId } = useParams<{ deviceId: string }>()

    // 🔹 React Query para obtener datos en tiempo real
    const { data, isLoading } = useQuery({
        queryFn: () => fetchRealtimeData(deviceId!),
        queryKey: ["realtimeData", deviceId],
        refetchInterval: 5000, // 🔥 Actualizar cada 5s
        enabled: !!deviceId, // Evita la consulta si `deviceId` es `undefined`
    });
    // 🔹 Estados locales de los dispositivos
    const [estadoMotor, setEstadoMotor] = useState(false);
    const [estadoCarrusel, setEstadoCarrusel] = useState(false);

    if (isLoading) return <p className="text-center text-gray-600">Cargando datos...</p>;

    return (
        <div className="flex flex-col items-center bg-blue-100 min-h-screen p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-9 place-items-center mt-10">
                {/* 🔹 Temperatura */}
                <div className="bg-white p-6 rounded-2xl shadow-xl w-80 h-80 text-center transition-transform transform hover:scale-105 hover:shadow-2xl mt-6">
                    <h1 className="text-2xl font-bold text-gray-800">Estado de la Temperatura</h1>
                    <p className="text-lg mt-3 flex flex-col items-center">
                        <img src="/img/temperatura.gif" alt="Temperatura" className="w-24 h-24 object-cover mb-4" />
                        <span className="font-semibold">Temperatura:</span> {data.temperature} °C
                    </p>
                </div>

                {/* 🔹 Humedad */}
                <div className="bg-white p-6 rounded-2xl shadow-xl w-80 h-80 text-center transition-transform transform hover:scale-105 hover:shadow-2xl mt-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Nivel de Humedad</h1>
                    <p className="text-lg mt-10 flex flex-col items-center">
                        <img src="/img/humedad.gif" alt="Humedad" className="w-24 h-24 object-cover mb-4" />
                        <span className="font-semibold">Humedad:</span> {data.humidity} %
                    </p>
                </div>

                {/* 🔹 Detección de Presencia */}
                <div className="bg-white p-6 rounded-2xl shadow-xl w-80 h-80 text-center transition-transform transform hover:scale-105 hover:shadow-2xl mt-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Presencia del bebé</h1>
                    <p className="text-lg mt-10 flex flex-col items-center">
                        <img src="/img/bebe.gif" alt="Bebé en la cuna" className="w-24 h-24 object-cover mb-4"/>
                        <span className={`font-semibold ${data.obstaculo ? 'text-green-600' : 'text-red-600'}`}>
                            {data.obstaculo ? "Bebé en la cuna" : "¡Cuna vacía!"}
                        </span>
                    </p>
                </div>
            </div>

            {/* 🔹 Control IoT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center mt-10">
                <TarjetaControl 
                    titulo="Movimiento de la Cuna" 
                    descripcion="Activa o desactiva el movimiento automático de la cuna." 
                    imagenEstatica="/img/cuna.png" 
                    imagenAnimada="/img/cuna.gif" 
                    estado={estadoMotor} 
                    setEstado={setEstadoMotor} 
                    puntoDeApi="/iot/control/balanceo"
                />
                <TarjetaControl 
                    titulo="Giro del Carrusel" 
                    descripcion="Controla el movimiento del carrusel para entretener al bebé." 
                    imagenEstatica="/img/juguete-de-la-cuna.png" 
                    imagenAnimada="/img/juguete-de-la-cuna.gif" 
                    estado={estadoCarrusel} 
                    setEstado={setEstadoCarrusel} 
                    puntoDeApi="/iot/control/carrusel" 
                />
            </div>
        </div>
    );
}
