import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/BabyDreamsAPI";
import Public from "../components/Public";


export default function PublicLayout() {
    const { data: user, isLoading, isError} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
      })
    
      if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>
      
      return <Public user={isError || !user ? null : user} />

      
}