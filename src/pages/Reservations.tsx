import AddRoom from "@/components/add-room";
import InitialLayout from "@/components/initial-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSalon, type EstadoReserva } from "@/hooks/SalonContext";
import { useUser } from "@/hooks/UserContext";
import { client } from "@/supabase/client";
import { MoveUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Reservations() {
  const navigate = useNavigate();
  const { loadImg } = useUser();
  const { activeSalon, reservas, salones } = useSalon();
  const [openSheet, setOpenSheet] = useState(false);

  const handleEstado = async (id: number, estado: EstadoReserva) => {
    console.log("ID enviado:", id);
    const { data, error } = await client
      .from("reservas")
      .update({
        estado: estado,
      })
      .eq("id", id)
      .select();

    console.log(data);

    if (error) {
      console.error("No se puede cambiar el estado", error);
      return;
    }
    toast.success("Estado actualizado");
  };

  return (
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <InitialLayout>
          <div className="m-4 mt-0">
            {salones.length == 0 ? (
              <div className="flex flex-col items-center">
                <p className="text-xl">
                  No tienes salones añadidos, necesitas añadir uno
                </p>
                <Button
                  onClick={() => setOpenSheet(true)}
                  className="h-12 flex items-center mt-3"
                >
                  Añadir uno
                  <MoveUpRight />
                </Button>
              </div>
            ) : activeSalon?.publicado ? (
              reservas.length > 0 ? (
                reservas.map((reserva) => {
                  const cliente = reserva.cliente;
                  const limpio = reserva.rango.replace(/[\[\]\(\)"]/g, "");
                  const [inicio, fin] = limpio.split(",");

                  const fechaInicio = new Date(inicio);
                  const fechaFin = new Date(fin);

                  console.log(inicio, fechaInicio);

                  return (
                    <div className="border w-96 px-3 py-4 space-y-3 rounded-2xl">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 rounded-lg text-sm">
                            <AvatarImage src={loadImg(cliente)} alt="" />
                            <AvatarFallback className="rounded-lg">
                              CN
                            </AvatarFallback>
                          </Avatar>
                          <p>{`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}</p>
                        </div>
                        {reserva.estado == "Aceptado" ? (
                          <Badge className="h-7 bg-green-700/90">
                            Aceptado
                          </Badge>
                        ) : reserva.estado == "Pendiente" ? (
                          <Badge className="h-7 bg-amber-300/90 text-black">
                            Pendiente
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="h-7">
                            Cancelado
                          </Badge>
                        )}
                      </div>
                      <div className="text-2xl flex justify-between">
                        <p>
                          {fechaInicio.toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        -
                        <p>
                          {fechaFin.toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t border-dashed pt-2">
                        <p className="text-gray-600">
                          {fechaInicio.toLocaleDateString("es-MX", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-xl">${reserva.costo}</p>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button className="w-full h-12">Detalles</Button>
                        </SheetTrigger>
                        <SheetContent className="py-8 px-6">
                          <div className="h-11/12 space-y-3">
                            <div className="flex flex-col items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={loadImg(cliente)} alt="" />
                                <AvatarFallback className="rounded-lg">
                                  CN
                                </AvatarFallback>
                              </Avatar>
                              <p>{`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}</p>
                            </div>
                            <div className="text-2xl flex justify-between">
                              <p>
                                {fechaInicio.toLocaleTimeString("es-MX", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              -
                              <p>
                                {fechaFin.toLocaleTimeString("es-MX", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="flex gap-2 items-center">
                                <p>Status:</p>
                                {reserva.estado == "Aceptado" ? (
                                  <Badge className="h-7 bg-green-700/90">
                                    Aceptado
                                  </Badge>
                                ) : reserva.estado == "Pendiente" ? (
                                  <Badge className="h-7 bg-amber-300/90 text-black">
                                    Pendiente
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive" className="h-7">
                                    Cancelado
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div>
                              <p>
                                Fecha:{" "}
                                {fechaInicio.toLocaleDateString("es-MX", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <div>
                              <p>Descripcion de la reserva</p>
                              <p>{reserva.descripcion}</p>
                            </div>
                          </div>
                          <div className="border w-full absolute bottom-0 left-0 py-4 px-2 flex justify-end gap-2">
                            {reserva.estado == "Pendiente" ? (
                              <>
                                <Button
                                  onClick={() =>
                                    handleEstado(reserva.id, "Aceptado")
                                  }
                                  // handleEstado(reserva.id, "Aceptado")
                                  className="bg-emerald-800 hover:bg-emerald-900"
                                >
                                  Aceptar
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleEstado(reserva.id, "Rechazado")
                                  }
                                >
                                  Rechazar
                                </Button>
                              </>
                            ) : reserva.estado == "Aceptado" ? (
                              <Button
                                onClick={() =>
                                  handleEstado(reserva.id, "Rechazado")
                                }
                              >
                                Cancelar
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  );
                })
              ) : (
                <p className="flex justify-center text-xl">No hay reservas</p>
              )
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-xl">
                  No puedes recibir reservas, necesitas publicar tu salón
                </p>
                <Button
                  onClick={() => navigate("/information")}
                  className="h-12 flex items-center mt-3"
                >
                  Ir a publicar
                  <MoveUpRight />
                </Button>
              </div>
            )}
          </div>
        </InitialLayout>
        <SheetContent className="min-w-1/2">
          <AddRoom modalClose={() => {}} />
        </SheetContent>
      </Sheet>
  );
}
