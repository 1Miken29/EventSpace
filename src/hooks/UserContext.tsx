import { client } from "@/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";

export interface Usuario {
  id?: number;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  email?: string;
  telefono?: number;
  providers?: string[];
  fileName?: string;
}

interface UserContextType {
  user: Usuario | null;
  saveUser: (email: string) => void;
  logout: () => void;
  saveProviders: (provider: string, email: string) => void;
  loadImg: (user: Usuario | null) => string;
}

const defaultContext: UserContextType = {
  user: null,
  saveUser: () => {},
  logout: () => {},
  saveProviders: () => {},
  loadImg: () => '',
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          const { data: updatedUser, error } = await client
            .from("usuarios")
            .select("*")
            .eq("email", parsedUser.email)
            .single();
          if (error) {
            console.error("Error al actualizar usuario desde Supabase:", error);
            return;
          }

          setUser(updatedUser); // Actualiza con info nueva
          await localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, []);

  const saveUser = async (email: string) => {
    try {
      const { data, error } = await client
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Error al obtener usuario:", error);
        return;
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error("Error en saveUser:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const saveProviders = async (email: string, newProvider: string) => {
    try {
      // 1. Obtener proveedores actuales
      const { data, error } = await client
        .from("usuarios")
        .select("providers")
        .eq("email", email)
        .single();

      if (error) throw error;

      const currentProviders: string[] = data.providers || [];

      if (!currentProviders.includes(newProvider)) {
        const updatedProviders = [...currentProviders, newProvider];

        const { error: updateError } = await client
          .from("usuarios")
          .update({ providers: updatedProviders })
          .eq("email", email);

        if (updateError) throw updateError;
      }

      // 2. Obtener el usuario completo actualizado
      const { data: updatedUser, error: fetchError } = await client
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError) throw fetchError;

      // 3. Guardar en contexto y localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error actualizando usuario y providers:", err);
    }
  };

  const loadImg = (user: Usuario | null) => {
    const fileName = user?.fileName ?? ""

    const { data } = client.storage.from('avatars').getPublicUrl(fileName)
    const url = data.publicUrl
    return url
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logout, saveProviders, loadImg }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
