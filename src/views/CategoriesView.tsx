import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/BabyDreamsAPI";
import { Category } from "../types/category";
import { Link } from "react-router-dom";

const CategoriesView = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="text-center text-gray-600">Cargando categorías...</p>;
  if (isError) return <p className="text-center text-red-500">Error al cargar las categorías.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">📂 Categorías de Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data.map((category: Category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition transform duration-200 flex flex-col items-center"
          >
            {/* 🔥 Contenedor de la imagen con tamaño fijo */}
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 🔥 Información de la categoría */}
            <div className="flex flex-col flex-grow justify-between mt-4 w-full text-center">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{category.description}</p>
              <Link
                to={`/category/${category._id}`} // 🔥 Enlace a los productos de la categoría
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
              >
                Ver Productos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
