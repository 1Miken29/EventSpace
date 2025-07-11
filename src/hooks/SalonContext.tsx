import { createContext, useContext, useEffect, useState } from "react";
import { useUser, type Usuario } from "./UserContext";
import { client } from "@/supabase/client";

export interface Salon {
  id?: number;
  id_user?: number;
  nombre?: string;
  descripcion?: string;
  capacidadMin?: number;
  capacidadMax?: number;
  horarioApertura?: string;
  horarioCierre?: string;
  publicado?: boolean;
  logo?: React.ElementType;
  plan?: string;
  precio?: number;
  bloqueHora?: number;
  precioHoraExtra?: number;
  fileName?: string[];
}

interface Comentario {
  id: number;
  descripcion: string;
  calificacion: number;
  created_at: string;
  cliente: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fileName: string;
  };
}

export type EstadoReserva = "Pendiente" | "Aceptado" | "Rechazado";
interface Reserva {
  id: number;
  rango: string;
  estado: EstadoReserva;
  cliente: Usuario;
  descripcion: string;
  costo: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

interface SalonContextType {
  salones: Salon[];
  reservas: Reserva[];
  activeSalon: Salon | null;
  setActiveSalon: (salon: Salon) => void;
  comentarios: Comentario[] | null;
  promedio: number | string;
  imagenes: string[];
}

const defaultContext: SalonContextType = {
  salones: [],
  reservas: [],
  activeSalon: null,
  setActiveSalon: () => {},
  comentarios: [],
  promedio: 0,
  imagenes: [],
};

const SalonContext = createContext<SalonContextType>(defaultContext);

export default function SalonProvider({ children }: any) {
  const { user } = useUser();
  const [salones, setSalones] = useState<Salon[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [activeSalon, setActiveSalon] = useState<Salon | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[] | null>(null);
  const [promedio, setPromedio] = useState<number | string>(0);
  const [imagenes, setImagenes] = useState<string[]>([]);

  useEffect(() => {
    const obtenerSalones = async () => {
      try {
        const { data, error } = await client.from("salones").select("*");

        if (error) {
          alert("error al cargar los salones");
        }
        console.log(data);
        setSalones(data as Salon[]);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.id) {
      obtenerSalones();
    }
  }, [user?.id]);

  useEffect(() => {
    if (salones.length > 0 && !activeSalon) {
      setActiveSalon(salones[0]);
    }
  }, [salones, activeSalon]);

  //Obtener las reservas del salón activo

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const { data, error } = await client
          .from("reserva_with_usuario")
          .select("*")
          .eq("id_salon", activeSalon?.id);

        if (error) {
          alert("Error al cargar las reservas");
          return;
        }
        setReservas(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.id && activeSalon?.id) {
      obtenerReservas();
    }
  }, [user?.id, activeSalon?.id]);

  // Comentarios con el nombre del usuario que creo el comentario

  useEffect(() => {
    try {
      const comentariosSalon = async (id: number) => {
        const { data, error } = await client
          .from("comentarios_with_usuarios_and_salon")
          .select("*")
          .eq("id_salon", id);

        if (error) {
          console.error("Error al obtener comentarios del salón:", error);
          return [];
        }

        const comentarios = data as Comentario[];

        const promedio =
          comentarios.length > 0
            ? (
                comentarios.reduce((sum, c) => sum + c.calificacion, 0) /
                comentarios.length
              ).toFixed(1)
            : 0;
        setComentarios(comentarios);
        setPromedio(promedio);
      };
      if (user?.id && activeSalon?.id) {
        comentariosSalon(activeSalon?.id);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user?.id, activeSalon?.id]);

  //Imagenes del salón activo

  useEffect(() => {
    const cargarImagenes = () => {
      const imagenes: string[] = [];
      const fileName = activeSalon?.fileName ?? [];
      fileName.map((file) => {
        const { data } = client.storage.from("salones").getPublicUrl(file);
        imagenes.push(data.publicUrl);
      });
      setImagenes(imagenes);
    };
    cargarImagenes();
  }, [user?.id, activeSalon?.id]);

  return (
    <SalonContext.Provider
      value={{
        salones,
        reservas,
        activeSalon,
        setActiveSalon,
        comentarios,
        promedio,
        imagenes,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
}

export const useSalon = () => useContext(SalonContext);
