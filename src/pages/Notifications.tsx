import InitialLayout from "@/components/initial-layout";
import { Badge } from "@/components/ui/badge";
import { useSalon } from "@/hooks/SalonContext";
import { BadgeAlert, BadgeCheck } from "lucide-react";

export default function Notifications() {
  const { reservas } = useSalon();

  return (
    <InitialLayout>
      <div className="p-4 pt-0 grid grid-cols-4">
        {reservas?.map((reserva) => {
          const limpio = reserva.rango.replace(/[\[\]\(\)"]/g, ""); // Quita [, ], (, ), y "
          const [inicio, fin] = limpio.split(",");

          const fechaInicio = new Date(inicio);
          const fechaFin = new Date(fin);

          const obtenerFecha = (fecha: Date) =>
            fecha.toISOString().split("T")[0];
          const obtenerHora = (fecha: Date) =>
            fecha.toISOString().split("T")[1].slice(0, 5);
          return (
            <div className="w-full p-2 rounded-3xl border" key={reserva.id}>
              <div className="flex items-center justify-around">
                <p className="font-semibold">{`${reserva.nombre} ${reserva.apellidoPaterno}`}</p>
                <Badge
                  className={`h-8 ${
                    reserva.estado === "Pendiente"
                      ? "bg-amber-400"
                      : reserva.estado === "Aceptado"
                      ? "bg-green-700"
                      : "bg-red-700"
                  }`}
                >
                  {reserva.estado === "Pendiente" ? (
                    <BadgeAlert />
                  ) : reserva.estado === "Aceptado" ? (
                    <BadgeCheck />
                  ) : (
                    <BadgeAlert />
                  )}
                  {reserva.estado}
                </Badge>
              </div>
              <p>{`${obtenerFecha(fechaInicio)}`}</p>
              <p>{`${obtenerHora(fechaInicio)} - ${obtenerHora(fechaFin)}`}</p>
            </div>
          );
        })}
      </div>
    </InitialLayout>
  );
}
