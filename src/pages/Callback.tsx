import { useUser } from "@/hooks/UserContext";
import { client } from "@/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Callback() {
  const navigate = useNavigate();

  const { saveUser, saveProviders } = useUser();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await client.auth.getSession();

      if (data?.session?.user?.email) {
        saveUser(data.session.user.email);
        saveProviders(data.session.user.email, "google");
        navigate("/dashboard");
      } else {
        console.error("No se pudo obtener sesión");
      }
    };

    getSession();
  }, []);

  return <p>Autenticando...</p>;
}
