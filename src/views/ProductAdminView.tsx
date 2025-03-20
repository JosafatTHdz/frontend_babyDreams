import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../api/BabyDreamsAPI";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Category } from "../types/category";
import { Product } from "../types/product";

export default function AdminProducts() {
    const { data: products, isLoading: productsLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });

    if (productsLoading || categoriesLoading) return <p className="text-center text-gray-500">Cargando productos...</p>;
    if (!products || !categories) return <p className="text-center text-red-500">Error al cargar los datos.</p>;

    // 🔍 Mapeo de categorías { id: name }
    const categoryMap = new Map(categories.map((cat : Category) => [cat._id, cat.name]));

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-600 my-6">Administrar Productos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Categoría</th>
                            <th className="py-3 px-6 text-left">Precio</th>
                            <th className="py-3 px-6 text-left">Stock</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product : Product) => (
                            <tr key={product._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{product.name}</td>
                                <td className="py-3 px-6">{String(categoryMap.get(product.category) || "Sin categoría")}</td>
                                <td className="py-3 px-6 font-semibold">${product.price}</td>
                                <td className="py-3 px-6 text-center">{product.stock}</td>
                                <td className="py-3 px-6 flex justify-center space-x-3">
                                    <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
                                        <FaEdit size={18} />
                                    </button>
                                    <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
