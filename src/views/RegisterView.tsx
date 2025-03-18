import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import type { RegisterForm } from '../types'
import ErrorMessage from '../components/ErrorMessage'
import { toast } from 'sonner'
import api from '../config/axios'

export default function RegisterView() {
    const navigate = useNavigate();
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: '',
        phone: '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const password = watch('password')

    const handleRegister = async (formData: RegisterForm) => {
        try {
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data);
            navigate('/auth/login')
            reset()
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
                console.log(error.response.data.error)
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Crear Cuenta</h2>
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
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
                        <label htmlFor="email" className="block text-lg font-medium text-blue-700">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
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
                        <label htmlFor="phone" className="block text-lg font-medium text-blue-700">Telefono</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="Tu numero de telefono"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('phone', { required: "El telefono es obligatorio" })}
                        />
                        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-blue-700">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('password', {
                                required: "El Password es obligatorio",
                                minLength: { value: 8, message: "El password debe ser mínimo de 8 caracteres" }
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="block text-lg font-medium text-blue-700">Repetir Contraseña</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repetir Password"
                            className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                            {...register('password_confirmation', {
                                required: "Repetir password es obligatorio",
                                validate: (value) => value === password || 'Los password no coinciden'
                            })}
                        />
                        {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-bold text-lg transition duration-300"
                    >
                        Crear Cuenta
                    </button>
                </form>
                <nav className="mt-5 text-center">
                    <Link to="/auth/Login" className="text-blue-600 hover:underline">¿Ya tienes una cuenta? Inicia Sesión</Link>
                </nav>
            </div>
        </div>
    )
}
