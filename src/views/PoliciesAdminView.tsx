import React, { useEffect, useState } from "react"
import axios from "axios"
import api from "../config/axios"

type PolicyItem = {
  _id: string
  title: string
  description: string
}

const AdminPoliPage: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyItem[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})
  const [editTitle, setEditTitle] = useState<{ [key: string]: string }>({})
  const [editDescription, setEditDescription] = useState<{ [key: string]: string }>({})

  const fetchPolicies = async () => {
    try {
      const res = await api.get("/policies")
      setPolicies(res.data)
    } catch (error) {
      console.error("Error obteniendo políticas:", error)
    }
  };

  useEffect(() => {
    fetchPolicies()
  }, [])

  const handleAddPolicy = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Por favor, llena ambos campos.");
      return;
    }
  
    if (newDescription.trim().length < 10) {
      alert("La descripción debe tener al menos 10 caracteres.");
      return;
    }
  
    try {
      const response = await api.post("/policies/add", {
        title: newTitle.trim(),
        description: newDescription.trim(),
      });
  
      const newPolicy = response.data?.data;
  
      if (!newPolicy || !newPolicy._id) {
        console.error("La política recibida no tiene un ID válido:", newPolicy);
        alert("Error inesperado: No se pudo crear la política correctamente.");
        return;
      }
  
      setPolicies((prev) => [...prev, newPolicy]);
  
      setNewTitle("");
      setNewDescription("");
  
      setTimeout(() => {
        const lastItem = document.querySelector(".policy-item:last-child");
        lastItem?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      let errorMessage = "Error al comunicarse con el servidor";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      }
      alert(`Error: ${errorMessage}`);
    }
  };
  

  const handleDeletePolicy = async (id: string) => {
    try {
      await api.delete(`/policies/delete/${id}`)
      setPolicies(prev => prev.filter(policy => policy._id !== id))
    } catch (error) {
      let errorMessage = "Error al eliminar";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }
      alert(`Error: ${errorMessage}`);
    }
  }

  const handleUpdatePolicy = async (id: string) => {
    if (!editTitle[id]?.trim() || !editDescription[id]?.trim()) {
      alert("Ambos campos son obligatorios");
      return
    }
    console.log(id)

    try {
      await api.put(`/policies/update/${id}`, {
        title: editTitle[id],
        description: editDescription[id],
      })

      setPolicies(prev =>
        prev.map(policy =>
          policy._id === id
            ? {
                ...policy,
                title: editTitle[id],
                description: editDescription[id],
              }
            : policy
        )
      )

      setEditMode(prev => ({ ...prev, [id]: false }))
    } catch (error) {
      let errorMessage = "Error al editar"
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleEditClick = (id: string, currentTitle: string, currentDescription: string) => {
    setEditMode(prev => ({ ...prev, [id]: true }))
    setEditTitle(prev => ({ ...prev, [id]: currentTitle }))
    setEditDescription(prev => ({ ...prev, [id]: currentDescription }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Administrar Políticas</h2>

      {/* Formulario */}
      <div className="space-y-4 mb-10">
        <div>
          <label className="block font-medium text-gray-700">Título de la política</label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="Ej: Política de privacidad"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={50}
          />
          <div className="text-sm text-gray-400 mt-1">{newTitle.length}/50</div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Descripción</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="Describe los detalles de la política"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            maxLength={500}
            rows={4}
          />
          <div className="text-sm text-gray-400 mt-1">{newDescription.length}/500</div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">CREADAS: {policies.length}</span>
          <button
            onClick={handleAddPolicy}
            className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            ➕ Agregar Política
          </button>
        </div>
      </div>

      {/* Lista de políticas */}
      <ul className="space-y-6">
        {policies.map((policy) => (
          <li key={policy._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 policy-item">
            {editMode[policy._id] ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Título</label>
                  <input
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={editTitle[policy._id]}
                    onChange={(e) =>
                      setEditTitle(prev => ({ ...prev, [policy._id]: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Descripción</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows={4}
                    value={editDescription[policy._id]}
                    onChange={(e) =>
                      setEditDescription(prev => ({ ...prev, [policy._id]: e.target.value }))
                    }
                  />
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleUpdatePolicy(policy._id)}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                  >
                    💾 Guardar
                  </button>
                  <button
                    onClick={() => setEditMode(prev => ({ ...prev, [policy._id]: false }))}
                    className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{policy.title}</h3>
                <p className="text-gray-700 mt-2">{policy.description}</p>
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => handleEditClick(policy._id, policy.title, policy.description)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded-md"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDeletePolicy(policy._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPoliPage