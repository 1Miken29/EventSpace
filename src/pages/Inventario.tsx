import InitialLayout from "@/components/initial-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSalon } from "@/hooks/SalonContext";
import { useUser } from "@/hooks/UserContext";
import { client } from "@/supabase/client";
import { useState } from "react";

export default function Invetario() {
  const { activeSalon } = useSalon();
  const { user } = useUser();

  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fechaInicio || !horaInicio || !horaFin) {
      console.error("Faltan datos");
      return;
    }

    const dateStart = new Date(`${fechaInicio}T${horaInicio}`);
    const dateEnd = new Date(`${fechaInicio}T${horaFin}`);
    const hours1 = horaInicio.split("-", 1);
    const hours2 = horaFin.split("-", 1);
    let fechaFinStr = fechaInicio;

    if (hours2 < hours1) {
      dateEnd.setDate(dateStart.getDate() + 1);
      fechaFinStr = dateEnd.toISOString().split("T")[0];
    }

    const rango = `[${fechaInicio} ${horaInicio}, ${fechaFinStr} ${horaFin})`;
    console.log(rango);

    try {
      const { error } = await client.from("reservas").insert([
        {
          rango,
          id_salon: activeSalon?.id,
          id_cliente: user?.id,
        },
      ]);
      if (error) {
        alert("Hubo un error al realizar la reserva");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <InitialLayout>
      <div className="p-4 pt-0">
        <h1>Prueba de Reservas en web</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Prueba de Reservas</SheetTitle>
              <SheetDescription>
                Esta acción es solo para probar la realización de reservas
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="px-4 space-y-2">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora de inicio
                  </label>
                  <Input
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    type="time"
                    className="h-12"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora de finalización
                  </label>
                  <Input
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    type="time"
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <Input
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  type="date"
                  className="h-12 pr-10"
                />
              </div>
              <Button>Enviar</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </InitialLayout>
  );
}
