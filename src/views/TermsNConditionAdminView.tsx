import { useEffect, useState } from "react";
import api from "../config/axios";
import { isAxiosError } from "axios";

interface TermItem {
    _id: string;
    title: string;
    description: string;
}

const AdminTerms = () => {
    const [terms, setTerms] = useState<TermItem[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [editTitle, setEditTitle] = useState<{ [key: string]: string }>({});
    const [editDescription, setEditDescription] = useState<{ [key: string]: string }>({});

    const fetchTerms = async () => {
        try {
            const res = await api.get("/terms");
            setTerms(res.data);
        } catch (error) {
            console.error("Error obteniendo términos:", error);
        }
    };

    useEffect(() => {
        fetchTerms();
    }, []);

    const handleAddTerm = async () => {
        if (!newTitle.trim() || !newDescription.trim()) {
            alert("Por favor, llena ambos campos.");
            return;
        }

        try {
            const response = await api.post("/terms/add", {
                title: newTitle,
                description: newDescription,
            });

            setTerms(prev => [
                ...prev,
                {
                    _id: response.data.data ? response.data.data._id : response.data._id,
                    title: newTitle,
                    description: newDescription,
                },
            ]);

            setNewTitle("");
            setNewDescription("");

            setTimeout(() => {
                const lastItem = document.querySelector(".term-item:last-child");
                lastItem?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (error) {
            if (isAxiosError(error) && error.response)
                alert(`Error: ${error.response.data.message}`);
        }
    };

    const handleDeleteTerm = async (id: string) => {
        try {
            await api.delete(`/terms/delete/${id}`);
            setTerms(prev => prev.filter(term => term._id !== id));
        } catch (error) {
            if (isAxiosError(error) && error.response)
                alert(`Error: ${error.response.data.message}`)
        }
    }

    const handleUpdateTerm = async (id: string) => {
        if (!editTitle[id]?.trim() || !editDescription[id]?.trim()) {
            alert("Ambos campos son obligatorios");
            return;
        }

        try {
            await api.put(`/terms/update${id}`, {
                title: editTitle[id],
                description: editDescription[id],
            });

            setTerms(prev =>
                prev.map(term =>
                    term._id === id
                        ? { ...term, title: editTitle[id], description: editDescription[id] }
                        : term
                )
            );

            setEditMode(prev => ({ ...prev, [id]: false }));
        } catch (error) {
            if (isAxiosError(error) && error.response)
                alert(`Error: ${error.response.data.message}`);
        }
    }

    const handleEditClick = (id: string, currentTitle: string, currentDescription: string) => {
        setEditMode(prev => ({ ...prev, [id]: true }));
        setEditTitle(prev => ({ ...prev, [id]: currentTitle }));
        setEditDescription(prev => ({ ...prev, [id]: currentDescription }));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Administrar Términos y Condiciones</h2>

            <div className="space-y-4 mb-10">
                <div>
                    <label className="block font-medium text-gray-700">Título del Término</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2 mt-1"
                        placeholder="Ej: Uso del Sitio"
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
                        placeholder="Describe el término"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        maxLength={500}
                        rows={4}
                    />
                    <div className="text-sm text-gray-400 mt-1">{newDescription.length}/500</div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">CREADOS: {terms.length}</span>
                    <button
                        onClick={handleAddTerm}
                        className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                    >
                        ➕ Agregar Término
                    </button>
                </div>
            </div>

            <ul className="space-y-6">
                {terms.map((term) => (
                    <li key={term._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 term-item">
                        {editMode[term._id] ? (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium">Título</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={editTitle[term._id]}
                                        onChange={(e) =>
                                            setEditTitle(prev => ({ ...prev, [term._id]: e.target.value }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Descripción</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        rows={4}
                                        value={editDescription[term._id]}
                                        onChange={(e) =>
                                            setEditDescription(prev => ({ ...prev, [term._id]: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <button
                                        onClick={() => handleUpdateTerm(term._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                                    >
                                        💾 Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditMode(prev => ({ ...prev, [term._id]: false }))}
                                        className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-md"
                                    >
                                        ❌ Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{term.title}</h3>
                                <p className="text-gray-700 mt-2">{term.description}</p>
                                <div className="flex gap-4 mt-3">
                                    <button
                                        onClick={() => handleEditClick(term._id, term.title, term.description)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded-md"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTerm(term._id)}
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


export default AdminTerms;