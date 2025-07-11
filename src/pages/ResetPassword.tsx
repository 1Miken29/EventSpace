import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { client } from "../supabase/client";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password == confirmPassword) {
      try {
        const { error } = await client.auth.updateUser({
          password,
        });
        if(error) {
          alert(error)
          return
        }
        navigate("/login")
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen bg-radial from-gray-900 from-25% via-purple-800 to-purple-600 via-70%">
      <form className="w-full max-w-md max-h-full" onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <div className="mb-3 flex flex-col items-center justify-around">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Cambiar tu contraseña
              </CardTitle>
              <CardDescription className="text-md text-center">
                La nueva contraseña debe ser diferente a las contraseñas
                anteriores
              </CardDescription>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa una contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ingresa una contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
            >
              Reiniciar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
