import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

const fetchFaqs = async () => {
  const { data } = await api.get("/faqs");
  return data;
};

const AdminFaqPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { data: faqs, isLoading, isError } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const addFaqMutation = useMutation({
    mutationFn: async (newFaq: { question: string; answer: string }) => {
      await api.post("/faqs/add", newFaq);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["faqs"]});
    },
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/faqs/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["faqs"]});
    },
  });

  const updateFaqMutation = useMutation({
    mutationFn: async ({ id, answer }: { id: string; answer: string }) => {
      await api.put(`/faqs/update/${id}`, { answer });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["faqs"]});
    },
  });

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editAnswer, setEditAnswer] = useState<{ [key: string]: string }>({});

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert("Por favor, llena ambos campos.");
      return;
    }
    addFaqMutation.mutate({ question: newQuestion, answer: newAnswer });
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleDeleteFaq = (id: string) => {
    deleteFaqMutation.mutate(id);
  };

  const handleEditClick = (id: string, currentAnswer: string) => {
    setEditMode({ ...editMode, [id]: true });
    setEditAnswer({ ...editAnswer, [id]: currentAnswer });
  };

  const handleUpdateFaq = (id: string) => {
    if (!editAnswer[id]?.trim()) {
      alert("La respuesta no puede estar vacía.");
      return;
    }
    updateFaqMutation.mutate({ id, answer: editAnswer[id] });
    setEditMode({ ...editMode, [id]: false });
  };

  if (isLoading) return <p className="text-center text-gray-600">Cargando preguntas...</p>;
  if (isError) return <p className="text-center text-red-500">Error al cargar preguntas.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Administrar Preguntas Frecuentes</h2>

      {/* Formulario para agregar FAQ */}
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Pregunta"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Respuesta"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button
          onClick={handleAddFaq}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md font-bold"
        >
          Agregar
        </button>
      </div>

      {/* Lista de FAQs */}
      <ul className="space-y-4">
        {faqs.map((faq: FaqItem) => (
          <li key={faq._id} className="bg-white p-4 rounded-md shadow">
            <strong>{faq.question}</strong>

            {editMode[faq._id] ? (
              <>
                <input
                  className="w-full p-2 border border-gray-300 rounded my-2"
                  type="text"
                  value={editAnswer[faq._id]}
                  onChange={(e) => setEditAnswer({ ...editAnswer, [faq._id]: e.target.value })}
                />
                <button
                  onClick={() => handleUpdateFaq(faq._id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md my-1"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditMode({ ...editMode, [faq._id]: false })}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p className="my-2">{faq.answer}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(faq._id, faq.answer)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFaqPage;
