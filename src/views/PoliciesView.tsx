import React, { useEffect, useState } from "react"
import api from "../config/axios"

type Policy = {
  _id: string
  title: string
  description: string
}

const PoliticasPrivacidad: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await api.get('/policies')
        const sorted = res.data.sort((a: Policy, b: Policy) =>
          a.title.localeCompare(b.title)
        )
        setPolicies(sorted)
      } catch (err) {
        console.error("Error al obtener políticas:", err)
      }
    }

    fetchPolicies()
  }, [])

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 mt-20 mb-36 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">
        Políticas de Privacidad
      </h1>
      <p className="text-base text-gray-600 mb-8 leading-relaxed text-justify">
        Bienvenido a nuestras Políticas de Privacidad. Aquí explicamos cómo
        recopilamos, utilizamos y protegemos tu información personal.
      </p>

      <div className="space-y-4">
        {policies.map((policy) => (
          <div key={policy._id} className="border-b border-gray-200 pb-3">
            <button
              onClick={() => handleToggle(policy._id)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-lg font-medium text-gray-800">
                {policy.title}
              </h2>
              <span className="text-xl text-primary">
                {activeId === policy._id ? "−" : "+"}
              </span>
            </button>
            {activeId === policy._id && (
              <div className="mt-2 text-gray-600 text-sm animate-fade-in">
                <p className="whitespace-pre-line">{policy.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-2">
        Contacto
      </h2>
      <p className="text-base text-gray-600">
        Si tienes preguntas o inquietudes sobre esta política de privacidad,
        puedes contactarnos en{" "}
        <strong className="text-primary">soporte@babydreams.com</strong>.
      </p>
    </section>
  )
}

export default PoliticasPrivacidad