import { FaBars, FaChevronDown, FaFacebook, FaInstagram, FaSearch, FaTimes } from "react-icons/fa";
import { logoinv } from "../assets/img";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { User } from "../types";
import { useState } from "react";
import { logoutUser } from "../api/BabyDreamsAPI";
import { useQueryClient } from "@tanstack/react-query";

type BabyDreamsProps = {
  user: User
}

export default function Public({ user }: BabyDreamsProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setMenuOpen(menuOpen === menu ? null : menu)
  }

  const handleLogout = async () => {
    await logoutUser();
    queryClient.clear();
    navigate("/");
    window.location.reload();
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-4 shadow-md">
        <div className="flex items-center">
          <Link to={'/'}><img src={logoinv} alt="Logo" className="w-16 h-14 mr-3" /></Link>
          <h1 className="text-white text-lg font-bold font-sans">Baby Dreams</h1>
        </div>

        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-md px-3 py-2 w-full max-w-lg">
          <input
            type="text"
            className="p-2 outline-none text-gray-700 w-full text-base md:text-base lg:text-base" // 🔹 Mantiene el mismo tamaño que los demás elementos
            placeholder="Buscar productos..."
          />
          <button type="submit" className="text-blue-500 p-2 hover:text-blue-700">
            <FaSearch size={20} /> {/* 🔍 Tamaño ajustado al header */}
          </button>
        </form>

        <nav className="bg-blue-400 text-white">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">

            <div className="hidden md:flex space-x-6">
              <div className="relative group">
                <button onMouseEnter={() => toggleMenu("productos")} className="flex items-center gap-2">
                  Productos <FaChevronDown size={12} />
                </button>
                {menuOpen === "productos" && (
                  <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md w-40" onMouseLeave={() => setMenuOpen(null)}>
                    <Link to="/products" className="block px-4 py-2 hover:bg-gray-200">Ver Productos</Link>
                    <Link to="/category" className="block px-4 py-2 hover:bg-gray-200">Categorías</Link>
                    {user?.role === "admin" && (
                      <>
                        <Link to="/admin/product/register" className="block px-4 py-2 hover:bg-gray-200">Agregar Producto</Link>
                        <Link to="/admin/product/modify" className="block px-4 py-2 hover:bg-gray-200">Administrar</Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="relative group">
                <button onMouseEnter={() => toggleMenu("info")} className="flex items-center gap-2">
                  Información <FaChevronDown size={12} />
                </button>
                {menuOpen === "info" && (
                  <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md w-40" onMouseLeave={() => setMenuOpen(null)}>
                    <Link to="/about" className="block px-4 py-2 hover:bg-gray-200">Conócenos</Link>
                    <Link to="/contact" className="block px-4 py-2 hover:bg-gray-200">Contacto</Link>
                    {user?.role === "admin" && (
                      <Link to="/admin/about/edit" className="block px-4 py-2 hover:bg-gray-200">Administrar</Link>
                    )}
                  </div>
                )}
              </div>

              <Link to={'/admin/profile'}>Mi Perfil</Link>

              <Link to="/admin/device">Dispositivos</Link>

              {user?.role === "admin" && (
                <div className="relative group" onMouseLeave={() => setMenuOpen(null)}>
                  <button onMouseEnter={() => toggleMenu("admin")} className="flex items-center gap-2">
                    Admin <FaChevronDown size={12} />
                  </button>
                  {menuOpen === "admin" && (
                    <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md w-40 z-40">
                      <Link to="/admin/faq" className="block px-4 py-2 hover:bg-gray-200">FAQ</Link>
                      <Link to="/admin/policies" className="block px-4 py-2 hover:bg-gray-200">Políticas</Link>
                      <Link to="/admin/terms" className="block px-4 py-2 hover:bg-gray-200">Términos</Link>
                    </div>
                  )}
                </div>
              )}

              {/* Botón de inicio o cierre de sesión */}
              {user ? (
                <button onClick={handleLogout} className="hover:text-gray-200 cursor-pointer">Cerrar Sesión</button>
              ) : (
                <Link to="/auth/login" className="hover:text-gray-200">Iniciar Sesión</Link>
              )}
            </div>

            {/* Menú Hamburguesa en móviles */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Menú Móvil */}
          {isOpen && (
            <div className="md:hidden bg-blue-600 text-white">
              <Link to="/products" className="block px-4 py-2 hover:bg-blue-700">Ver Productos</Link>
              <Link to="/categories" className="block px-4 py-2 hover:bg-blue-700">Categorías</Link>
              <Link to="/about" className="block px-4 py-2 hover:bg-blue-700">Conócenos</Link>
              <Link to="/contact" className="block px-4 py-2 hover:bg-blue-700">Contacto</Link>
              {user?.role === "admin" && <Link to="/admin" className="block px-4 py-2 hover:bg-blue-700">Admin</Link>}
              {user ? (
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-700">Cerrar Sesión</button>
              ) : (
                <Link to="/auth/login" className="block px-4 py-2 hover:bg-blue-700">Iniciar Sesión</Link>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-5">
        <Outlet context={user} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Enlaces de Interés</h2>
          <ul className="mt-2 space-y-2">
            <li><Link to="/policies" className="text-gray-300 hover:text-white transition">Políticas de privacidad</Link></li>
            <li><Link to="/terms" className="text-gray-300 hover:text-white transition">Términos y condiciones</Link></li>
            <li><Link to="/faq" className="text-gray-300 hover:text-white transition">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Redes sociales</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition"><FaFacebook size={24} /></a>
            <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition"><FaInstagram size={24} /></a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Contacto</h2>
          <p className="text-gray-300 mt-2">soporte@babydreams.com</p>
        </div>

        <p className="text-gray-400 mt-6">&copy; {new Date().getFullYear()} Baby Dreams. Todos los derechos reservados.</p>
      </footer>

      <Toaster position="top-right" />
    </div>
  )
}