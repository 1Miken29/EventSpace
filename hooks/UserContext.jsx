import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode"; // Para decodificar el JWT

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookies.get("token"); // Lee la cookie con el JWT
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decodifica el JWT
        setUserData(decoded); // Guarda los datos del usuario
        setUser(true);
      } catch (error) {
        console.error("Error al decodificar el JWT:", error);
      }
    }
  }, []);

  const savePersonalData = (personalData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...personalData,
    }));
  };

  const saveCredentials = (credentials) => {
    setUserData((prevData) => ({
      ...prevData,
      ...credentials,
    }));
    setUser(true);
  };

  return (
    <UserContext.Provider value={{ user, userData, savePersonalData, saveCredentials }}>
      {children}
    </UserContext.Provider>
  );
};
