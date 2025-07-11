import InitialLayout from "@/components/initial-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSalon } from "@/hooks/SalonContext";
import { useUser } from "@/hooks/UserContext";
import { Star } from "lucide-react";

export default function Califications() {
  const { loadImg } = useUser();
  const { comentarios } = useSalon();
  return (
    <InitialLayout>
      <div className="p-7 pt-0">
        <p>Mostrando {comentarios?.length} comentarios</p>
        {comentarios?.map((comentario, index) => {
          const cliente = comentario.cliente;
          const dia = comentario.created_at.split("T")[0];
          const fecha = new Date(dia);
          console.log(fecha);
          return (
            <div key={index} className="border p-3 rounded-lg my-2">
              <div className="flex items-center gap-2">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={loadImg(cliente)} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-xl">{`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}</p>
              </div>
              <div className="flex gap-3 items-center my-2">
                <Star />
                <p className="text-xl">{comentario.calificacion.toFixed(1)}</p>
                <p>
                  {fecha.toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p>{comentario.descripcion}</p>
            </div>
          );
        })}
      </div>
    </InitialLayout>
  );
}
