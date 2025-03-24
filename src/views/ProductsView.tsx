import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/BabyDreamsAPI"
import { Product } from "../types/product"
import { Link } from "react-router-dom"
import { useState } from "react"

const PRODUCTS_PER_PAGE = 12

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <p className="text-center text-gray-600">Cargando productos...</p>
  if (isError) return <p className="text-center text-red-500">Error al cargar los productos.</p>

  const totalProducts = data.length
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const currentProducts = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage => currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage => currentPage + 1)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">🛒 Productos Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product: Product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition transform duration-200 flex flex-col items-center"
          >
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col flex-grow justify-between mt-4 w-full text-center">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              <Link to={`/product/${product._id}`} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 Controles de paginación */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Home
