import { useUser } from "@/hooks/UserContext";
import { Navigate, Outlet, useLocation } from "react-router";

const isUserIncomplete = (user: any) => {
  if (!user) return true;

  const requiredFields = [
    "nombre",
    "apellidoPaterno",
    "apellidoMaterno",
  ];

  return requiredFields.some((field) => !user[field]);
};

export const NullRoute = () => {
  const { user } = useUser();
  const location = useLocation();

  // Si el usuario está incompleto y no está ya en setup, lo redirigimos
  if (isUserIncomplete(user) && location.pathname !== "/account-setup") {
    return <Navigate to="/account-setup" replace />;
  }

  // Si está todo bien, renderizamos lo que sigue (Outlet → las rutas hijas)
  return <Outlet />;
};
