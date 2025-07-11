import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "@/components/google-button.tsx";
import { useNavigate } from "react-router";
import { client } from "../supabase/client.ts";
import { useUser } from "@/hooks/UserContext";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const { saveUser, saveProviders } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { error } = await client.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("user already registered")) {
          toast.error("Usuario ya registrado", {
            description: "Inicia sesión para poder continuar",
          });
        } else if (
          error.message
            .toLowerCase()
            .includes("anonymous sign-ins are disabled")
        ) {
          toast.error("Rellena los campos", {
            description: "Debes rellenar los campos",
          });
        } else if (
          error.message
            .toLowerCase()
            .includes("signup requires a valid password") ||
          error.message.toLowerCase().includes("password should be at least") ||
          error.message.toLowerCase().includes("password should contain at least")
        ) {
          toast.error("Contraseña inválida", {
            description:
              "Debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo",
          });
        }
        return;
      }

      saveProviders(formData.email, 'email')
      saveUser(formData.email);
      navigate("/account-setup");
    } catch (err) {
      console.error(err);
    }
  };

  const registerWithGoogle = async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${window.location.origin}/auth/callback`, // opcional
      },
    });

    if (error) {
      toast.error("Error al iniciar sesión con Google");
      console.error(error);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left Side - Purple Gradient */}
      <div className="flex-1 bg-gradient-to-b from-purple-300 via-purple-600 via-30% via-purple-800 to-gray-900 to-85% flex flex-col justify-center items-center text-white p-8 m-2 mr-0 rounded-4xl">
        <div className="max-w-sm text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 border-2"></div>
            <span className="text-xl font-semibold">EventSpace</span>
          </div>
          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              Publica tu salón para mejorar tus ingresos
            </h1>
            <p className="text-purple-200 text-sm">Completa el registro</p>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl text-gray-900">
              Crea una cuenta
            </h2>
            <p className="text-gray-600 text-sm">
              Ingresa tus credenciales para crear una cuenta
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <GoogleButton onClick={registerWithGoogle}>Google</GoogleButton>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo
              </label>
              <Input
                type="email"
                placeholder="ej. eventspace@example.co"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa una contraseña"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Debe contener minimo 8 carácteres, una minúscula, una mayúscula,
                un número y un símbolo
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
            >
              Continuar
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Al registrarse acepta los Términos y Condiciones de EventSpace
          </p>
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-gray-900 font-medium hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
