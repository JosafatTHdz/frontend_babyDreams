import { useEffect, useState } from "react";
import api from "../config/axios";


type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

const FaqPage = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
    
  useEffect(() => {
    api
      .get('/faqs')
      .then((response) => {
        setFaqs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleAnswer = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 font-roboto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Preguntas Frecuentes
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white rounded-lg shadow p-4">
            <button
              onClick={() => toggleAnswer(faq._id)}
              className="flex items-center justify-between w-full text-left text-lg font-semibold text-blue-600"
              aria-expanded={activeId === faq._id}
            >
              <span>{faq.question}</span>
              <span className="text-2xl">
                {activeId === faq._id ? "−" : "+"}
              </span>
            </button>

            {activeId === faq._id && (
              <div
                className="mt-2 text-gray-700 transition-all duration-300"
                aria-hidden={activeId !== faq._id}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqPage;
