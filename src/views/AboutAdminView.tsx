import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegFileAlt } from 'react-icons/fa';
import ErrorMessage from '../components/ErrorMessage';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getAbout, updateAbout } from '../api/BabyDreamsAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { About, AboutForm } from '../types/about';

const AboutAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: getAbout,
    queryKey: ['about'],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<About>();
  useEffect(() => {
    if (data) {
      reset({
        quienesSomos: data.quienesSomos || '',
        mision: data.mision || '',
        vision: data.vision || '',
        antecedentes: data.antecedentes || '',
      });
    }
  }, [data, reset])

  const updateAboutMutation = useMutation({
    mutationFn: updateAbout,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['about'] })
    },
  })

  const handleUpdateAbout = (formData: AboutForm) => {
    if (!data?._id) {
      console.error("❌ Error: No hay un ID disponible para actualizar.");
      return;
    }
  
    const updatedData = { ...formData, _id: data._id };
    updateAboutMutation.mutate(updatedData);
  };
  

  if (isLoading) return <p className="text-center text-gray-600">Cargando información...</p>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">Administrar Información</h2>
          <FaRegFileAlt size={32} className="text-gray-500" />
        </div>
        <form onSubmit={handleSubmit(handleUpdateAbout)} className="space-y-5">
          <div>
            <label htmlFor="quienesSomos" className="block text-lg font-medium text-blue-700">Quiénes Somos</label>
            <textarea
              id="quienesSomos"
              rows={3}
              className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              {...register('quienesSomos', { required: "Este campo es obligatorio" })}
            />
            {errors.quienesSomos?.message && <ErrorMessage>{String(errors.quienesSomos.message)}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="mision" className="block text-lg font-medium text-blue-700">Misión</label>
            <textarea
              id="mision"
              rows={3}
              className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              {...register('mision', { required: "Este campo es obligatorio" })}
            />
            {errors.mision?.message && <ErrorMessage>{String(errors.mision.message)}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="vision" className="block text-lg font-medium text-blue-700">Visión</label>
            <textarea
              id="vision"
              rows={3}
              className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              {...register('vision', { required: "Este campo es obligatorio" })}
            />
            {errors.vision?.message && <ErrorMessage>{String(errors.vision.message)}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="antecedentes" className="block text-lg font-medium text-blue-700">Antecedentes</label>
            <textarea
              id="antecedentes"
              rows={3}
              className="w-full p-3 mt-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
              {...register('antecedentes', { required: "Este campo es obligatorio" })}
            />
            {errors.antecedentes?.message && <ErrorMessage>{String(errors.antecedentes.message)}</ErrorMessage>}
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-bold text-lg transition duration-300 cursor-pointer"
          >
            ACTUALIZAR INFORMACIÓN
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

export default AboutAdmin;
