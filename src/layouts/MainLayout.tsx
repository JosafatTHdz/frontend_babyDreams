import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/BabyDreamsAPI";
import BabyDreams from "../components/BabyDreams";

export default function MainLayout() {

  const { data, isLoading, isError} = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (isLoading) return 'Cargando...'
  if (isError) {
    return <Navigate to={'/auth/login'}/>
  }
  if (data) return (<BabyDreams data={data}/>);
}
