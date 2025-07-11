import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/UserContext";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { client } from "@/supabase/client";
import { toast } from "sonner";

interface UserEditable {
  fileName?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  email?: string;
  telefono?: number;
}

export default function EditProfile({
  modalClose,
}: {
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, loadImg } = useUser();
  const [userEditable, setUserEditable] = useState<UserEditable>({
    fileName: user?.fileName,
    nombre: user?.nombre,
    apellidoPaterno: user?.apellidoPaterno,
    apellidoMaterno: user?.apellidoMaterno,
    email: user?.email,
    telefono: user?.telefono,
  });
  const values = Object.keys(userEditable);
  const [selectedImage, setSelectedImage] = useState(loadImg(user));
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file); // ← guardar el archivo
      setUserEditable((prev) => ({
        ...prev,
        fileName: file.name,
      }));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { error } = await client
        .from("usuarios")
        .update({ ...userEditable })
        .eq("id", user?.id);
      if (error) {
        console.error("Error al editar los datos", error);
        return;
      }

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await client.storage
          .from("avatars")
          .upload(filePath, imageFile, {
            contentType: imageFile.type,
            upsert: true, // reemplaza si ya existe
          });

        if (uploadError) {
          console.error("Error al subir imagen:", uploadError);
          return;
        }

        // guardar nuevo nombre en DB
        await client
          .from("usuarios")
          .update({ ...userEditable, fileName })
          .eq("id", user?.id);
      }
      toast.info("Perfil editado", {
        description: "Actualiza la página para ver tus datos",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-10 text-sm">
        <header className="text-base py-4 px-6 border font-circular">
          Edita tus datos
        </header>
        {values.map((value, index) => {
          if (value == "fileName") {
            return (
              <div
                key={index}
                className="items-center grid gap-2 grid-cols-6 px-6"
              >
                <Avatar className="w-24 h-24 text-2xl font-bold col-span-2">
                  <AvatarImage
                    className="border rounded-full"
                    src={selectedImage || ""}
                    alt="avatar"
                  />
                  <AvatarFallback className="bg-gray-300">CN</AvatarFallback>
                </Avatar>
                <Button
                  onClick={handleButtonClick}
                  variant="outline"
                  className="text-gray-800 h-12 w-full space-y-2 col-span-2"
                >
                  <Upload className="w-5 h-5" />
                  Subir
                </Button>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            );
          }
          return (
            <div key={index} className="grid gap-2 grid-cols-12 px-6">
              <label className="flex flex-col space-y-2 col-span-4">
                {capitalize(value)}
              </label>
              <Input
                value={String(userEditable[value as keyof UserEditable] ?? "")}
                onChange={(e) =>
                  setUserEditable((prev) => ({
                    ...prev,
                    [value]: e.target.value,
                  }))
                }
                type="text"
                className="col-span-8 py-2 px-4"
              />
            </div>
          );
        })}
        <footer className="border w-full absolute bottom-0 py-4 px-2 flex justify-end gap-2">
          <Button type="button" onClick={() => modalClose(false)}>
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={() => modalClose(false)}
            className="bg-emerald-800 hover:bg-emerald-900"
          >
            Enviar
          </Button>
        </footer>
      </form>
    </div>
  );
}
