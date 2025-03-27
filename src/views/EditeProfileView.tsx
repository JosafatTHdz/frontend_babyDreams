import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import ErrorMessage from '../components/ErrorMessage';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { User } from '../types';
import { updateProfile } from '../api/BabyDreamsAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!
 
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        handle: data.handle,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role
    }});

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })
    
    const handleUpdateProfile = (formData: Omit<User, '_id'>) => {
        updateProfileMutation.mutate({ ...formData, _id: data._id });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <div className="flex items-center justify-center space-x-3 mb-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600">Editar Perfil</h2>
                    <FaUserCircle size={32} className="text-gray-500" />
                </div>
                <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-blue-700">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('name', { required: "El nombre es obligatorio" })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-blue-700">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('email', {
                                required: "El Email es obligatorio",
                                pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" }
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>
                    <div>
                        <label htmlFor="handle" className="block text-lg font-medium text-blue-700">Usuario</label>
                        <input
                            id="handle"
                            type="text"
                            placeholder="Nombre de usuario"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('handle', { required: "El usuario es obligatorio" })}
                        />
                        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-blue-700">Teléfono</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="Tu número de teléfono"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('phone', { required: "El teléfono es obligatorio" })}
                        />
                        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-bold text-lg transition duration-300 cursor-pointer"
                    >
                        ACTUALIZAR PERFIL
                    </button>
                    <button
                        type="button"
                        className="w-full py-3 mt-3 text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-100 font-bold text-lg transition duration-300 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        VOLVER
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
