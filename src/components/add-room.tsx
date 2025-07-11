import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Salon } from "@/hooks/SalonContext";
import { useUser } from "@/hooks/UserContext";
import { client } from "@/supabase/client";
import { Upload } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AddRoom({
  modalClose,
}: {
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [salonData, setSalonData] = useState<Salon>({
    id_user: user?.id,
    nombre: "",
    descripcion: "",
    capacidadMin: 0,
    capacidadMax: 0,
    horarioApertura: "",
    horarioCierre: "",
    precio: 0,
    bloqueHora: 0,
    precioHoraExtra: 0,
    fileName: [],
  });

  const handleInputChange = (field: string, value: string) => {
    setSalonData((prev) => ({ ...prev, [field]: value }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImagesToSupabase = async (folderName: string) => {
    const uploadedFileNames: string[] = [];

    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${folderName}/${fileName}`;
      const { error } = await client.storage
        .from("salones")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error subiendo imagen:", error);
        throw error;
      }

      uploadedFileNames.push(fileName);
    }

    return uploadedFileNames;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));

    setSelectedImages((prev) => [...prev, ...previews]);
    setImageFiles((prev) => [...prev, ...fileArray]);

    setSalonData((prev) => ({
      ...prev,
      fileName: [...prev.fileName ?? [], ...fileArray.map((f) => f.name)],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setSalonData((prev) => ({
      ...prev,
      fileName: prev.fileName?.filter((_, i) => i !== index),
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const folderName = salonData.nombre
      ?.trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    try {
      const uploadedFileNames = await uploadImagesToSupabase(
        folderName ?? `${salonData?.nombre}`
      );
      const { error } = await client.from("salones").insert([
        {
          id_user: user?.id,
          nombre: salonData.nombre,
          descripcion: salonData.descripcion,
          capacidadMin: salonData.capacidadMin,
          capacidadMax: salonData.capacidadMax,
          horarioApertura: salonData.horarioApertura,
          horarioCierre: salonData.horarioCierre,
          precio: salonData.precio,
          bloqueHora: salonData.bloqueHora,
          precioHoraExtra: salonData.precioHoraExtra,
          fileName: uploadedFileNames.map((name) => `${folderName}/${name}`),
        },
      ]);

      if (error) {
        toast.error('Error al subir el salón')
        console.error("Error al insertar un salon", error);
        return;
      }

      navigate("/information");
    } catch (err) {
      console.error("Error general al crear salón:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="text-sm flex flex-col flex-1 overflow-hidden"
      >
        <header className="text-base bg-white py-4 px-6 border font-circular sticky top-0 z-10">
          Agregar un nuevo salón
        </header>
        <div className="flex-1 space-y-10 overflow-y-auto py-10">
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">Nombre</label>
            <Input
              value={salonData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              type="text"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Descripción
            </label>
            <Textarea
              value={salonData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              rows={5}
              cols={100}
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Capacidad Mínima
            </label>
            <Input
              value={salonData.capacidadMin}
              onChange={(e) =>
                handleInputChange("capacidadMin", e.target.value)
              }
              type="number"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Capacidad Máxima
            </label>
            <Input
              value={salonData.capacidadMax}
              onChange={(e) =>
                handleInputChange("capacidadMax", e.target.value)
              }
              type="number"
              placeholder="Opcional"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Horario de Apertura
            </label>
            <Input
              value={salonData.horarioApertura}
              onChange={(e) =>
                handleInputChange("horarioApertura", e.target.value)
              }
              type="time"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Horario de Cierre
            </label>
            <Input
              value={salonData.horarioCierre}
              onChange={(e) =>
                handleInputChange("horarioCierre", e.target.value)
              }
              type="time"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">Precio</label>
            <Input
              value={salonData.precio}
              onChange={(e) => handleInputChange("precio", e.target.value)}
              type="number"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Horas por bloque
            </label>
            <Input
              value={salonData.bloqueHora}
              onChange={(e) => handleInputChange("bloqueHora", e.target.value)}
              type="number"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Precio por hora extra
            </label>
            <Input
              value={salonData.precioHoraExtra}
              onChange={(e) =>
                handleInputChange("precioHoraExtra", e.target.value)
              }
              type="number"
              className="col-span-8 py-2 px-4"
            />
          </div>
          <div className="grid gap-2 grid-cols-12 px-6">
            <label className="flex flex-col space-y-2 col-span-4">
              Imagenes
            </label>
            <div className="w-full col-span-8">
              <Button
              type="button"
                onClick={handleButtonClick}
                variant="outline"
                className="text-gray-800 h-12 w-full"
              >
                <Upload className="w-5 h-5" />
                Subir
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </div>
          {selectedImages.length > 0 && (
            <div className="px-6 flex flex-wrap gap-4">
              {selectedImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="h-32 w-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white bg-opacity-60 rounded-full p-1 hover:bg-opacity-80 w-7 h-7"
                  >
                    <span className="text-black text-xs">✕</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <footer className="border bg-white py-4 px-2 flex justify-end gap-2 sticky bottom-0 z-10">
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
