import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/UserContext";
import { Mail, PanelLeft, Phone, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { client } from "../supabase/client.ts";
import { Separator } from "@/components/ui/separator.tsx";

export default function Setup() {
  const navigate = useNavigate();
  const { user, saveUser } = useUser();

  const getInitials = (name: string, appat: string) => {
    const firstNameInitial = name.trim().charAt(0).toUpperCase();
    const lastNameInitial = appat.trim().charAt(0).toUpperCase();

    return `${firstNameInitial}${lastNameInitial}`;
  };

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    appat: "",
    apmat: "",
    fecha: "",
    telefono: "",
    rol: "Propietario",
  });

  useEffect(() => {
  if (
    user?.nombre &&
    user?.apellidoPaterno &&
    user?.apellidoMaterno &&
    user?.telefono
  ) {
    navigate("/dashboard");
  }
}, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await client
      .from("usuarios")
      .update({
        nombre: formData.name,
        apellidoPaterno: formData.appat,
        apellidoMaterno: formData.apmat,
        fechaNacimiento: formData.fecha,
        telefono: formData?.telefono,
      })
      .eq("email", user?.email)
      .select();

      if(error) {
        console.error("Error al agregar los datos del usuario", error);
        return;
      }
      await saveUser(data[0].email)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000)

    } catch (err) {
      console.error(err);
    }

  };

  const imgUrl = "";
  return (
    <>
      <div className="flex flex-row justify-center items-center h-screen bg-radial from-gray-900 from-25% via-purple-800 to-purple-600 via-70%">
        <div className="w-5xl h-5/6 flex bg-white rounded-3xl">
          {/* Izquierda */}
          <div className="w-1/2 pl-12 pr-7 flex flex-col justify-center">
            <div className="my-14 h-full">
              {/* Encabezado */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Completa tu perfil
                </h1>
                <p>Vamos a crear tu perfil en menos de 2 minutos</p>
              </div>
              <div>
                {step === 0 ? (
                  <div>
                    <div className="flex flex-row gap-3">
                      <div className="w-1/2 flex flex-col justify-center">
                        <h3 className="font-semibold text-gray-900">
                          Sube tu foto de perfil
                        </h3>
                        <div className="flex flex-row items-center gap-5">
                          <Button
                            variant="outline"
                            className="text-gray-800 h-12 w-full"
                          >
                            <Upload className="w-5 h-5" />
                            Subir
                          </Button>
                        </div>
                      </div>
                      <div className="w-1/2 my-3">
                        <h3 className="font-semibold text-gray-900">
                          Fecha de nacimiento
                        </h3>
                        <Input
                          id="fecha"
                          type="date"
                          value={formData.fecha}
                          onChange={(e) =>
                            handleInputChange("fecha", e.target.value)
                          }
                          className="h-12 w-full flex justify-center text-2xl"
                          required
                        />
                      </div>
                    </div>
                    <form>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Datos Personales
                      </h3>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="h-12"
                        required
                      />
                      <div className="flex flex-row gap-3 my-3">
                        <Input
                          id="appat"
                          type="text"
                          placeholder="Apellido Paterno"
                          value={formData.appat}
                          onChange={(e) =>
                            handleInputChange("appat", e.target.value)
                          }
                          className="h-12"
                          required
                        />
                        <Input
                          id="apmat"
                          type="text"
                          placeholder="Apellido Materno"
                          value={formData.apmat}
                          onChange={(e) =>
                            handleInputChange("apmat", e.target.value)
                          }
                          className="h-12"
                          required
                        />
                      </div>
                      <Button
                        onClick={() => setStep(1)}
                        className="h-12 w-full"
                      >
                        Siguiente
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="h-[calc(5/12*100vh)] flex flex-col justify-center">
                    <h3 className="mt-6 font-semibold text-gray-900">
                      Medio de contacto
                    </h3>
                    <form>
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder="Telefono de contacto"
                        value={formData.telefono}
                        onChange={(e) =>
                          handleInputChange("telefono", e.target.value)
                        }
                        className="h-12 my-3"
                        required
                      />
                      <Button onClick={handleSubmit} className="h-12 w-full">
                        Siguiente
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Derecha */}
          <div className="w-1/2 bg-purple-200 pt-15 pl-15 rounded-2xl border border-gray-300 overflow-hidden m-5">
            <div className="bg-white border h-full p-5 rounded-tl-lg">
              <header className="flex h-16 shrink-0 items-center gap-2">
                <PanelLeft className="w-7 h-7 ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-6"
                />
                <h1 className="font-semibold text-xl text-gray-900">Perfil</h1>
              </header>
              <div className="flex flex-row items-center gap-5 my-4">
                <Avatar className="w-24 h-24 rounded-none text-2xl font-bold">
                  <AvatarImage src={imgUrl} alt="@evilrabbit" />
                  <AvatarFallback className="bg-gray-300">
                    {getInitials(formData.name, formData.appat)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-semibold">
                  {formData.name + " " + formData.appat + " " + formData.apmat}
                </h1>
              </div>
              <div className="space-y-4 my-3 mx-2">
                <h1 className="text-xl font-bold text-gray-900">
                  Medios de contacto
                </h1>
                <div className="flex flex-row gap-5 items-center">
                  <Mail className="w-5 h-5" />
                  <h1>{user?.email}</h1>
                </div>
                <div className="flex flex-row gap-5 items-center">
                  <Phone className="w-5 h-5" />
                  <h1>{formData.telefono}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
