import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/BabyDreamsAPI";

const ProductDetailView = () => {
    const { productId } = useParams();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProduct(productId!),
        enabled: !!productId,
    });

    if (isLoading) return <p className="text-center text-gray-600">Cargando producto...</p>;
    if (isError || !product) return <p className="text-center text-red-500">Producto no encontrado.</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>

            {/* Imagen del Producto */}
            <div className="w-full max-w-md h-64 overflow-hidden rounded-lg mt-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>

            {/* Información */}
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-gray-600 mt-2">Precio: ${product.price}</p>
            

            {/* Botón de Comprar */}
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">
                🛒 Comprar
            </button>
        </div>
    );
};

export default ProductDetailView;
