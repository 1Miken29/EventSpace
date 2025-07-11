import App from "@/pages/App";
import Callback from "@/pages/Callback";
import ForgotPassword from "@/pages/ForgotPassword";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import { Navigate, Route, Routes } from "react-router";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
