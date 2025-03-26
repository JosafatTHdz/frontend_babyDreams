import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";
import { User } from "../types";
import { toast } from "sonner";
// import { useState } from "react";

export default function AdminUsuarios() {
    const queryClient = useQueryClient();
    //   const [editUser, setEditUser] = useState<User | null>(null);
    //   const [editedName, setEditedName] = useState<string>("");

    const { data: users, isLoading, isError } = useQuery<User[]>({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const res = await api.get("/admin/users");
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await api.delete(`/admin/users/delete/${id}`);
            return response.data.message || "Usuario eliminado correctamente";
        },
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ["admin-users"] })
        },
    });

    //   const updateMutation = useMutation({
    //     mutationFn: async ({ id, name }: { id: string; name: string }) => {
    //       await api.put(`/admin/users/update/${id}`, { name });
    //     },
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    //       setEditUser(null);
    //     },
    //   });

    //   const handleEdit = (user: User) => {
    //     setEditUser(user);
    //     setEditedName(user.name);
    //   };

    //   const handleSave = () => {
    //     if (editUser) {
    //       updateMutation.mutate({ id: editUser._id, name: editedName });
    //     }
    //   };

    if (isLoading) return <p className="text-center text-gray-500">Cargando usuarios...</p>;
    if (isError) return <p className="text-center text-red-500">Error al cargar los usuarios.</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Administrar Usuarios</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
                    <thead>
                        <tr className="bg-blue-100 text-gray-800 text-left">
                            <th className="px-4 py-3 border-b">Nombre</th>
                            <th className="px-4 py-3 border-b">Correo</th>
                            <th className="px-4 py-3 border-b text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    {user.name}
                                </td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3 text-center space-x-2">
                                    <>
                                        <button
                                            onClick={() => deleteMutation.mutate(user._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
