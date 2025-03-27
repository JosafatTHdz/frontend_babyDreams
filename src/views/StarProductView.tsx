// routes/ProductoEstrella.tsx

import { useNavigate } from 'react-router-dom'

export default function ProductoEstrella() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Cuna Automatizada</h1>

      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-5xl">
        <img
          src="https://res.cloudinary.com/josafat/image/upload/v1743039356/crib_jv2lrn.jpg"
          alt="Cuna Automatizada"
          className="w-full md:w-1/2 h-96 object-cover"
        />
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Tu aliado para el descanso del bebé</h2>
            <p className="text-gray-600 mb-4">
              Nuestra cuna activa movimiento automático, enciende el carrusel y monitorea temperatura, humedad y presencia.
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Movimiento automático</li>
              <li>Sensores de temperatura y humedad</li>
              <li>Detección de presencia del bebé</li>
              <li>Control desde app móvil y web</li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-green-600">Precio: $4,999 MXN</p>
            <button
              onClick={() => navigate("/register-device")}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
