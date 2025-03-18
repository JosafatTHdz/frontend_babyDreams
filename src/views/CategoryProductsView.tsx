import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Product } from "../types/product";
import { getProductsByCategory } from "../api/BabyDreamsAPI";

const CategoryProductsView = () => {
    const { categoryId } = useParams(); // 🔥 Obtiene el ID de la categoría desde la URL

    // 🚀 React Query para obtener productos por categoría
     const { data: products, isLoading, isError }= useQuery({
        queryKey: ["products", categoryId],
        queryFn: () => getProductsByCategory(categoryId!),
        enabled: !!categoryId // Evita la consulta si `categoryId` es `undefined`
    });

    if (isLoading) return <p className="text-center text-gray-600">Cargando productos...</p>;
    if (isError || !products || products.length === 0) return <p className="text-center text-red-500">No hay productos en esta categoría.</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">🛒 Productos de esta Categoría</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition transform duration-200 flex flex-col items-center">
                        <div className="w-full h-48 overflow-hidden rounded-lg">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col flex-grow justify-between mt-4 w-full text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                            <Link to={`/product/${product._id}`} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProductsView;
