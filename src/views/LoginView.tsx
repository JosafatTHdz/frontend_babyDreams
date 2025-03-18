import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { LoginForm } from "../types";
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import api from '../config/axios'
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const navigate = useNavigate();
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      toast.success('Sesión iniciada correctamente')
      navigate('/')
    } catch (error) {
      if (isAxiosError(error) && error.response)
        toast.error(error.response.data.error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2x1 p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Iniciar Sesión</h1>

        <div className="flex items-center justify-start mb-4">
          <Link to="/auth/Register" className="text-blue-500 font-semibold mr-2">REGISTRARME</Link>
          <GoTriangleRight size={20} className="text-blue-500" />
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="text-left mb-5"
          noValidate
        >
          <div>
            <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
            <input
              type="email"
              className={`w-full p-3 border rounded-md outline-none transition-all border-gray-300`}
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mt-3">Contraseña</label>
            <input
              type="password"
              className={`w-full p-3 border rounded-md outline-none transition-all border-gray-300`}
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="text-right mb-4">
            <a href="/forgot-password" className="text-blue-500 text-sm">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition"
          >
            INICIAR SESIÓN
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 font-semibold">O</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center p-3 bg-blue-700 text-white rounded-md font-bold mb-3 hover:bg-blue-800 transition">
          <FaFacebookF size={20} className="mr-3" /> INICIAR SESIÓN CON FACEBOOK
        </button>

        <button className="w-full flex items-center justify-center p-3 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition">
          <FaGoogle size={20} className="mr-3" /> INICIAR SESIÓN CON GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
