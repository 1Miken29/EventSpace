import Inventario from "@/pages/Inventario";
import Dashboard from "@/pages/Dashboard";
import Information from "@/pages/Information";
import Profile from "@/pages/Profile";
import Setup from "@/pages/Setup";
import { Navigate, Route, Routes } from "react-router";
import Reservations from "@/pages/Reservations";
import { NullRoute } from "./NullRoute";
import Califications from "@/pages/Califications";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<NullRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="information" element={<Information />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="profile" element={<Profile />} />
        <Route path="califications" element={<Califications />} />
      </Route>
      <Route path="account-setup" element={<Setup />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
