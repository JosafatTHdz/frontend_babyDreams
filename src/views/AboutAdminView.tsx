import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegFileAlt } from 'react-icons/fa';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getAbout, updateAbout } from '../api/BabyDreamsAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { AboutForm } from '../types/about';
import ErrorMessage from '../components/ErrorMessage';

export default function AdminAbout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    // Obtener datos de la empresa
    const { data, isLoading } = useQuery({
        queryFn: getAbout,
        queryKey: ['about'],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    // Hook de formulario
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AboutForm>();

    // Cargar los datos en el formulario cuando se obtienen
    useEffect(() => {
        if (data) {
            reset({
                quienesSomos: data.quienesSomos || '',
                mision: data.mision || '',
                vision: data.vision || '',
                antecedentes: data.antecedentes || '',
            });
        }
    }, [data, reset]);

    // Mutación para actualizar la información
    const updateAboutMutation = useMutation({
        mutationFn: updateAbout,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['about'] });
        },
    });

    // Manejo de actualización
    const handleUpdateAbout = (formData: AboutForm) => {
        if (!data?._id) {
            console.error("❌ Error: No hay un ID disponible para actualizar.");
            return;
        }
        updateAboutMutation.mutate({ ...formData, _id: data._id });
    };

    if (isLoading) return <p className="text-center text-gray-600">Cargando información...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white shadow-xl rounded-2xl p-12 w-full max-w-6xl">
                {/* Encabezado */}
                <div className="flex items-center space-x-4 mb-8 border-b pb-4">
                    <FaRegFileAlt size={40} className="text-blue-600" />
                    <h2 className="text-4xl font-bold text-blue-600">Administrar Información</h2>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit(handleUpdateAbout)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Quiénes Somos */}
                    <div className="col-span-2">
                        <label htmlFor="quienesSomos" className="block text-xl font-medium text-gray-700">Quiénes Somos</label>
                        <textarea
                            id="quienesSomos"
                            rows={4}
                            className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            {...register('quienesSomos', { required: "Este campo es obligatorio" })}
                        />
                        {errors.quienesSomos?.message && <ErrorMessage>{errors.quienesSomos.message}</ErrorMessage>}
                    </div>

                    {/* Misión */}
                    <div>
                        <label htmlFor="mision" className="block text-xl font-medium text-gray-700">Misión</label>
                        <textarea
                            id="mision"
                            rows={4}
                            className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            {...register('mision', { required: "Este campo es obligatorio" })}
                        />
                        {errors.mision?.message && <ErrorMessage>{errors.mision.message}</ErrorMessage>}
                    </div>

                    {/* Visión */}
                    <div>
                        <label htmlFor="vision" className="block text-xl font-medium text-gray-700">Visión</label>
                        <textarea
                            id="vision"
                            rows={4}
                            className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            {...register('vision', { required: "Este campo es obligatorio" })}
                        />
                        {errors.vision?.message && <ErrorMessage>{errors.vision.message}</ErrorMessage>}
                    </div>

                    {/* Antecedentes */}
                    <div className="col-span-2">
                        <label htmlFor="antecedentes" className="block text-xl font-medium text-gray-700">Antecedentes</label>
                        <textarea
                            id="antecedentes"
                            rows={4}
                            className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                            {...register('antecedentes', { required: "Este campo es obligatorio" })}
                        />
                        {errors.antecedentes?.message && <ErrorMessage>{errors.antecedentes.message}</ErrorMessage>}
                    </div>

                    {/* Botones */}
                    <div className="col-span-2 flex justify-between mt-6">
                        <button
                            type="button"
                            className="w-1/4 py-3 text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-100 font-bold text-lg transition duration-300"
                            onClick={() => navigate(-1)}
                        >
                            VOLVER
                        </button>
                        <button
                            type="submit"
                            className="w-1/4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-bold text-lg transition duration-300"
                        >
                            ACTUALIZAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
