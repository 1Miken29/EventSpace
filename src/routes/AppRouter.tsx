import { useUser } from "@/hooks/UserContext";
import { Route, Routes } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const { user } = useUser();

  console.log("usuario actual:", user);

  return (
    <Routes>
      {user ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
    </Routes>
  );
};
