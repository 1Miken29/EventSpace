import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { client } from "../supabase/client.ts";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      alert("Error al enviar el correo: " + error.message);
      return;
    }

    alert("Se ha enviado un enlace para restablecer tu contraseña.");
  };

  return (
    <>
      <header className="border w-full h-15 flex flex-row justify-between items-center px-5">
        <h1>EventSpace</h1>
        <div className="flex flex-row items-center gap-5">
          <h1>¿Ya tienes cuenta?</h1>
          <Button
            variant="outline"
            className="border border-purple-700"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </Button>
        </div>
      </header>
      <div className="flex flex-row justify-center items-center h-[calc(100vh-60px)] bg-radial from-gray-900 from-25% via-purple-800 to-purple-600 via-70%">
        <form className="w-full max-w-md max-h-full" onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <div className="mb-3 flex flex-col items-center justify-around">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  ¿Olvidaste tu contraseña?
                </CardTitle>
                <CardDescription className="text-md">
                  Te enviaremos un correo para cambiar tu contraseña
                </CardDescription>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="eventspace@example.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
              >
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
