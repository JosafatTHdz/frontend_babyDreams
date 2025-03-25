import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getProduct } from "../api/BabyDreamsAPI"
import { useState } from "react"
import { Category } from "../types/category"

const ProductDetailView = () => {
    const { productId } = useParams()
    const [quantity, setQuantity] = useState(1)

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProduct(productId!),
        enabled: !!productId,
    })

    const { data: category } = useQuery({
        queryKey: ["category"],
        queryFn: getCategories,
        enabled: !!product
    })

    if (isLoading) return <p className="text-center text-gray-600">Cargando producto...</p>
    if (isError || !product) return <p className="text-center text-red-500">Producto no encontrado.</p>

    const categoryMap = new Map((category ?? []).map((cat: Category) => [cat._id, cat.name]))

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Imagen */}
                <div className="bg-white p-6 rounded-xl shadow-md flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-md object-contain h-[400px]"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full mb-3">
                            Categoría: {String(categoryMap.get(product.category))}
                        </span>

                        <p className="text-2xl text-green-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                        {/* Selector de cantidad */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-gray-700 font-medium">Cantidad:</span>
                            <button
                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <span className="font-semibold text-lg">{quantity}</span>
                            <button
                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Botón comprar */}
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition mt-4 w-full md:w-2/3">
                        🛒 Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailView
