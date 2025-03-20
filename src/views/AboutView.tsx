import { useQuery } from "@tanstack/react-query"
import api from "../config/axios"

const fetchAbout = async () => {
    const { data } = await api.get("/about")
    return data;
}

const AboutSection = () => {
    const { data: about, isLoading, isError } = useQuery({
        queryKey: ["about"],
        queryFn: fetchAbout,
        staleTime: 1000 * 60 * 5, // 5 minutos antes de volver a hacer la petición
        refetchOnWindowFocus: false,
    })

    if (isLoading) return <p className="text-center text-gray-500">Cargando información...</p>
    if (isError) return <p className="text-center text-red-500">Error al cargar la información.</p>

    return (
        <div className="w-full text-gray-800 font-roboto">
            <div
                className="relative h-[450px] bg-cover bg-center flex flex-col justify-center items-center text-white z-0"
                style={{ backgroundImage: "url('https://res.cloudinary.com/josafat/image/upload/v1742145729/empresa_qrd3g4.jpg')" }}
            >
                <h2 className="text-6xl font-bold mb-4 bg-black bg-opacity-50 px-4 py-2 rounded-xl z-10 relative">
                    ¿Quiénes somos?
                </h2>
                <p className="text-xl max-w-2xl bg-black bg-opacity-50 px-6 py-4 rounded-xl z-10 relative">
                    {about?.quienesSomos}
                </p>
            </div>

            <div className="bg-blue-100 py-16 px-6 lg:px-32 grid lg:grid-cols-2 gap-12 text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start">
                    <img
                        src="https://res.cloudinary.com/josafat/image/upload/v1742145729/mision_rim6mg.webp"
                        alt="Misión"
                        className="w-40 h-40 object-cover rounded-full shadow-lg mb-6"
                    />
                    <h3 className="text-4xl font-bold text-black-700 mb-3">Misión</h3>
                    <p className="text-xl leading-relaxed max-w-md">{about?.mision}</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <img
                        src="https://res.cloudinary.com/josafat/image/upload/v1742145729/vision_xprzxc.png"
                        alt="Visión"
                        className="w-40 h-40 object-cover rounded-full shadow-lg mb-6"
                    />
                    <h3 className="text-4xl font-bold text-black-700 mb-3">Visión</h3>
                    <p className="text-xl leading-relaxed max-w-md">{about?.vision}</p>
                </div>
            </div>

            <div className="bg-blue-100 py-16 px-6 lg:px-32 flex flex-col items-center lg:items-start">
                <img
                    src="https://res.cloudinary.com/josafat/image/upload/v1742145730/antecedentes_i59nif.jpg"
                    alt="Antecedentes"
                    className="w-40 h-40 object-cover rounded-full shadow-lg mb-6"
                />
                <h3 className="text-4xl font-bold text-black-700 mb-3">Antecedentes</h3>
                <p className="text-xl leading-relaxed max-w-md">{about?.antecedentes}</p>
            </div>
        </div>
    )
}

export default AboutSection