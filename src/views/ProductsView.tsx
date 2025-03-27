import { useQuery } from "@tanstack/react-query"
import { getCategories, getProducts } from "../api/BabyDreamsAPI"
import { Product } from "../types/product"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Category } from "../types/category"

const PRODUCTS_PER_PAGE = 12

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
    enabled: !!data,
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

  const categoryMap = new Map((category ?? []).map((cat: Category) => [cat._id, cat.name]))

  const productoEstrella = {
    _id: "cuna-automatica-babydreams",
    name: "Cuna Automática BabyDreams",
    image: "https://res.cloudinary.com/josafat/image/upload/v1743039356/crib_jv2lrn.jpg",
    description: "Nuestra cuna automatizada estrella con funciones inteligentes para arrullar y entretener a tu bebé.",
    price: 4999.99,
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔹 Producto estrella destacado */}
      <div className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-xl shadow-lg p-6 mb-10 flex flex-col md:flex-row items-center justify-between">
        <img
          src={productoEstrella.image}
          alt={productoEstrella.name}
          className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-lg shadow-md mb-4 md:mb-0"
        />
        <div className="md:ml-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">🌟 Producto Estrella</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{productoEstrella.name}</h3>
          <p className="text-gray-600 mb-2">{productoEstrella.description}</p>
          <p className="text-lg font-bold text-green-600 mb-3">${productoEstrella.price.toFixed(2)} MXN</p>
          <Link to={`/product/crib`} className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow-md">
            Ver Detalles
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">🛒 Catálogo Disponible</h2>
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
              <p className="text-sm text-gray-500">{String(categoryMap.get(product.category))}</p>
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