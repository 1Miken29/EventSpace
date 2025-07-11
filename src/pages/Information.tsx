import InitialLayout from "@/components/initial-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSalon } from "@/hooks/SalonContext";
import {
  BadgeAlert,
  BadgeCheck,
  ChevronRight,
  Edit,
  MapPin,
  MoveUpRight,
  Star,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "../components/ui/sheet";
import AddRoom from "../components/add-room";
import { client } from "@/supabase/client";
import { useNavigate } from "react-router";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Information() {
  const navigate = useNavigate();
  const { activeSalon, salones, comentarios, promedio, imagenes } = useSalon();
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handlePublish = async () => {
    try {
      const { error } = await client
        .from("salones")
        .update({ publicado: "true" })
        .eq("id", activeSalon?.id)

      if (error) {
        alert("Error al publicar el salón");
        return;
      }
      toast.info('Salón publicado con éxito',{
        description:'Refresca para ver los cambios'
      })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <InitialLayout>
          <div className="p-7 pt-0">
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
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-baseline">
                    <h1 className="text-3xl">{activeSalon?.nombre}</h1>
                    {activeSalon?.publicado ? (
                      <Badge className="h-7 bg-green-700/90 mt-2">
                        <BadgeCheck />
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="h-7 mt-2">
                        <BadgeAlert />
                        No Publicado
                      </Badge>
                    )}
                  </div>
                  <div className="space-x-1">
                    {activeSalon?.publicado ? (
                      <Button className="h-12 w-24">
                        <Edit />
                        Editar
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => setOpenDialog(true)}
                          className="h-12 w-24 bg-purple-700 hover:bg-purple-800"
                        >
                          <Upload />
                          Publicar
                        </Button>
                        <Button className="h-12 w-24">
                          <Edit />
                          Editar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3 my-4">
                  {imagenes.map((imagen) => (
                    <div className="rounded-xl aspect-video overflow-hidden">
                      <img src={imagen} />
                    </div>
                  ))}
                  {/* <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" /> */}
                </div>
                <div className="flex gap-3 items-center my-3">
                  <MapPin strokeWidth={0.75} />
                  <p className="text-muted-foreground font-thin">
                    UBICACION ME FALTA
                  </p>
                </div>
                <div className="w-full flex justify-between mb-3">
                  <Button
                    onClick={() => navigate("/califications")}
                    variant="ghost"
                    className="flex items-center gap-7"
                  >
                    <Star />
                    <p>
                      {promedio} ({comentarios?.length} comentarios)
                    </p>
                    <ChevronRight />
                  </Button>
                  <div className="flex items-baseline">
                    <p className="text-3xl">${activeSalon?.precio}/</p>
                    <p className="text-xl text-muted-foreground">
                      {activeSalon?.bloqueHora} horas
                    </p>
                  </div>
                </div>
                <h1 className="text-2xl">Sobre este salón</h1>
                <p>{activeSalon?.descripcion}</p>
              </>
            )}
          </div>
        </InitialLayout>
        <SheetContent className="min-w-1/2">
          <AddRoom modalClose={setOpenSheet} />
        </SheetContent>
      </Sheet>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Quiere publicar tu salón?</AlertDialogTitle>
          <AlertDialogDescription>
            Se mostrará tu salón en la aplicación móvil y podrás recibir reservas y comentarios de clientes
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
