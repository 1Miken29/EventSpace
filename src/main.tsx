import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { UserProvider } from "./hooks/UserContext.tsx";
import { AppRouter } from "./routes/AppRouter.tsx";
import SalonProvider from "./hooks/SalonContext.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SalonProvider>
          <AppRouter />
          <Toaster position="top-center" richColors/>
        </SalonProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
