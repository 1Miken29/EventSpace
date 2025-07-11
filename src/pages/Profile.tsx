import EditProfile from "@/components/edit-profile";
import InitialLayout from "@/components/initial-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUser } from "@/hooks/UserContext";
import { Edit } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { user, loadImg } = useUser();
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
    <InitialLayout>
      <div className="py-4 px-8 pt-0 space-y-6">
        <div className="flex justify-between items-center border rounded-md p-4">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 rounded-none text-2xl font-bold">
              <AvatarImage src={loadImg(user)} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl">
              {user?.nombre + " " + user?.apellidoPaterno}
            </h1>
          </div>
          <Button onClick={() => setOpenSheet(true)} className="h-12 w-24">
            <Edit />
            Editar
          </Button>
        </div>
        <div className="py-2 border rounded-md p-4">
          <h1 className="text-xl py-2">Información personal</h1>
          <div className="grid grid-cols-3 text-muted-foreground">
            <div className="p-2">
              <p>Nombre</p>
              <p className="text-black">{user?.nombre}</p>
            </div>
            <div className="p-2">
              <p>Apellido Paterno</p>
              <p className="text-black">{user?.apellidoPaterno}</p>
            </div>
            <div className="p-2">
              <p>Apellido Materno</p>
              <p className="text-black">{user?.apellidoMaterno}</p>
            </div>
            <div className="p-2">
              <p>Correo Electrónico</p>
              <p className="text-black">{user?.email}</p>
            </div>
            <div className="p-2">
              <p>Número de teléfono</p>
              <p className="text-black">{user?.telefono}</p>
            </div>
            <div className="p-2">
              <p>Registro</p>
              {user?.providers?.includes("google") ? (
                <p className="text-white rounded-md px-2 w-fit bg-green-400">
                  Iniciado con Google
                </p>
              ) : (
                <p className="text-white rounded-md px-2 w-fit bg-destructive">
                  No Iniciado con Google
                </p>
              )}
            </div>
          </div>
        </div>
          {user?.providers?.includes("google") ? (
            user?.providers?.includes("email") ? (
              ""
            ) : (
              <div className="p-4 border rounded-md">
                <h1 className="text-xl py-2">Ingresa una contraseña para iniciar sesión con Email</h1>
                <div className="w-full grid grid-cols-3">
                  <div className="p-2">
                    <p>Ingresa una contraseña</p>
                    <Input />
                  </div>
                  <div className="p-2">
                    <p>Confirma tu contraseña</p>
                    <Input />
                  </div>
                  <div className="flex items-end p-2">
                    <Button>Agregar contraseña</Button>
                  </div>
                </div>
              </div>
            )
          ) : (
            ""
          )}
      </div>
    </InitialLayout>
    <SheetContent className="min-w-1/2">
      <EditProfile modalClose={setOpenSheet} />
    </SheetContent>
    </Sheet>
  );
}
