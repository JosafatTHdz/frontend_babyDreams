import { FaFacebook, FaInstagram, FaSearch } from "react-icons/fa";
import { logocompletoinv } from "../assets/img";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { User } from "../types";

type BabyDreamsProps = {
    data: User
}

export default function BabyDreams({data}: BabyDreamsProps) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-4 shadow-md">
        <div className="flex items-center">
          <img src={logocompletoinv} alt="Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-white text-lg font-bold font-sans">Baby Dreams</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-md px-2">
          <input
            type="text"
            className="p-2 outline-none text-gray-700"
            placeholder="Buscar productos..."
          />
          <button type="submit" className="text-blue-500 p-2">
            <FaSearch />
          </button>
        </form>

        <nav className="flex space-x-6">
          <Link to="/" className="text-white text-base font-medium hover:text-blue-700 transition">Inicio</Link>
          <Link to="/about" className="text-white text-base font-medium hover:text-blue-700 transition">Conócenos</Link>
          <Link to="/contact" className="text-white text-base font-medium hover:text-blue-700 transition">Contacto</Link>
          <Link to="/Login" className="text-white text-base font-medium hover:text-blue-700 transition">Cerrar Sesion</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-5">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-10 flex flex-row justify-between items-center">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Enlaces de Interés</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition">Políticas de privacidad</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition">Términos y condiciones</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Redes sociales</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-300 hover:text-white transition"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-300 hover:text-white transition"><FaInstagram size={24} /></a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Contacto</h2>
          <p className="text-gray-300 mt-2">contacto@ejemplo.com</p>
        </div>

        <p className="text-gray-400 mt-6">&copy; {new Date().getFullYear()} Baby Dreams. Todos los derechos reservados.</p>
      </footer>

      <Toaster position="top-right" />
    </div>
    )
}