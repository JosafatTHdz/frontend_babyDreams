import { Link, useLocation } from "react-router-dom"

const routeMap: Record<string, string> = {
  "products": "Productos",
  "product": "Producto",
  "support": "Soporte",
  "faq": "Preguntas Frecuentes",
  "terms": "Términos y Condiciones",
  "policies": "Políticas de Privacidad",
  "profile": "Perfil",
  // Agrega más si tienes rutas como /admin, /orders, etc.
}

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter(Boolean)

  return (
    <nav className="text-sm text-gray-500 my-4 px-6">
      <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
      {pathnames.map((part, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/")
        const isLast = index === pathnames.length - 1
        const label = routeMap[part] || decodeURIComponent(part)

        return (
          <span key={routeTo}>
            {" "}
            &gt;{" "}
            {isLast ? (
              <span className="font-semibold text-gray-700">{label}</span>
            ) : (
              <Link to={routeTo} className="text-blue-600 hover:underline">{label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
