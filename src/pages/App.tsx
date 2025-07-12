import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="m-2 flex flex-row gap-3">
        <Button
          variant="outline"
          className="border border-purple-700"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </Button>
        <Button
          className="bg-purple-700 hover:bg-purple-500"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </Button>
      </div>
      <div className="h-[calc(100vh-60px)] flex flex-row items-center justify-between mx-7">
        <div>
          <h1 className="text-7xl w-3xl my-2">
            Organizar tus salones en un solo <br /> lugar
          </h1>
          <p className="text-lg w-72 mx-2">
            Con EventSpace, cualquiera puede generar ingresos online. <br />Empieza
            con un click
          </p>
          <Button className="h-12 text-lg px-7 mx-2" onClick={() => navigate('/register')}>Empieza con EventSpace</Button>
        </div>
        <div className="my-auto">
          <img
            className="absolute right-10 top-1/5"
            src="https://rrfdtzhrxzvwabpnhzat.supabase.co/storage/v1/object/public/salones//Rectangle%202.png"
          />
          <img
            className="absolute right-5 top-1/3 z-10"
            src="https://rrfdtzhrxzvwabpnhzat.supabase.co/storage/v1/object/public/salones//Rectangle%201.png"
          />
          <img
            className="absolute right-10 top-1/2"
            src="https://rrfdtzhrxzvwabpnhzat.supabase.co/storage/v1/object/public/salones//Rectangle%203.png"
          />
        </div>
      </div>
    </div>
  );
}
