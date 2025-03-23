import React, { useEffect, useState } from "react"
import api from "../config/axios"

interface Term {
  _id: string;
  title: string;
  description: string;
}

const TerminosCondiciones: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await api.get("/terms");
        const sorted = res.data.sort((a: Term, b: Term) =>
          a.title.localeCompare(b.title)
        );
        setTerms(sorted);
      } catch (error) {
        console.error("Error obteniendo términos:", error);
      }
    };

    fetchTerms();
  }, []);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 mt-24 mb-28 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">
        Términos y Condiciones
      </h1>
      <p className="text-base text-gray-600 mb-8 leading-relaxed text-justify">
        Bienvenido a los Términos y Condiciones de Baby Dreams. Estos términos
        describen las reglas y regulaciones para el uso de nuestro sitio web y
        servicios. Al acceder y navegar en nuestro sitio, aceptas cumplir con
        todos los términos establecidos aquí.
      </p>

      <div className="space-y-4">
        {terms.map((term) => (
          <div key={term._id} className="border-b border-gray-200 pb-3">
            <button
              onClick={() => handleToggle(term._id)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-lg font-medium text-gray-800">
                {term.title}
              </h2>
              <span className="text-xl text-primary">
                {activeId === term._id ? "−" : "+"}
              </span>
            </button>
            {activeId === term._id && (
              <div className="mt-2 text-gray-600 text-sm animate-fade-in">
                <p className="whitespace-pre-line">{term.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-2">
        Contacto
      </h2>
      <p className="text-base text-gray-600">
        Si tienes preguntas o inquietudes acerca de estos Términos y
        Condiciones, puedes contactarnos en{" "}
        <strong className="text-primary">contacto@ejemplo.com</strong>.
      </p>
    </section>
  );
};

export default TerminosCondiciones;
