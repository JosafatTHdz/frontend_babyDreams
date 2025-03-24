import { Link } from "react-router-dom"

const Welcome = () => {
    const fondo = 'https://images.unsplash.com/photo-1699799462235-53a0ca5a7a43?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6 text-center"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 text-white">
                <h1 className="text-4xl font-bold mb-2">¡Bienvenido a BabyDreams!</h1>
                <p className="text-xl italic text-gray-400 mb-6">Soluciones modernas para padres que buscan lo mejor.</p>
                <p className="text-lg mb-8 max-w-xl">
                    Encuentra los productos ideales para el descanso y bienestar de tu bebé.
                </p>
                <Link
                    to="/products"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-200"
                >
                    Ver Productos
                </Link>
            </div>
        </div>

    )
}

export default Welcome
