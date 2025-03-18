import { useForm } from 'react-hook-form';
import { Product } from '../types/product';
import { toast } from 'sonner';
import api from '../config/axios';
import { isAxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Category } from '../types/category';
import { getCategories } from '../api/BabyDreamsAPI';

const RegisterProduct = () => {

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });
    

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();

    const handleRegisterProduct = async (formData: Product) => {
        try {
            const { data: newProduct } = await api.post(`/product/register`, {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                stock: formData.stock,
                price: formData.price,
                image: ""
            });

            const imageInput = document.getElementById("image") as HTMLInputElement;
            if (imageInput.files && imageInput.files[0]) {
                const imageFile = imageInput.files[0];
    
                const imageFormData = new FormData();
                imageFormData.append("file", imageFile);
                imageFormData.append("productId", newProduct._id)
    
                const { data: updatedProduct } = await api.post("/product/image", imageFormData);
                console.log("✅ Imagen subida y producto actualizado:", updatedProduct);
            } else {
                console.warn("⚠ No se seleccionó ninguna imagen");
            }
    
            toast.success("Producto registrado correctamente");
            reset();
    
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
                console.error(error.response.data.error);
            }
        }
    }    
    
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Registrar Producto</h2>
                <form onSubmit={handleSubmit(handleRegisterProduct)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-blue-700">Nombre del Producto</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nombre del producto"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('name', { required: "El nombre es obligatorio" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-blue-700">Descripción</label>
                        <textarea
                            id="description"
                            placeholder="Descripción del producto"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('description', { required: "La descripción es obligatoria" })}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-lg font-medium text-blue-700">Categoría</label>
                        <select
                            id="category"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('category', { required: "La categoría es obligatoria" })}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories?.map((cat: Category) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-lg font-medium text-blue-700">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="Cantidad en stock"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('stock', { 
                                required: "El stock es obligatorio", 
                                min: { value: 0, message: "El stock no puede ser negativo" } 
                            })}
                        />
                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-lg font-medium text-blue-700">Precio</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="Precio del producto"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('price', { 
                                required: "El precio es obligatorio", 
                                min: { value: 0, message: "El precio no puede ser negativo" } 
                            })}
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-blue-700">Subir Imagen</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('image', { 
                                required: "La imagen es obligatoria"
                            })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-bold text-lg transition duration-300"
                    >
                        REGISTRAR PRODUCTO
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterProduct;
