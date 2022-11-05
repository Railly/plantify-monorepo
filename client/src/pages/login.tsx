import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const username = data.get("username") as string;
      const password = data.get("password") as string;

      const response = await api.login({ username, password });
      if (response.ok) {
        if (response.user.isAdmin) {
          window.localStorage.setItem("token", response.token);
          window.localStorage.setItem("user", JSON.stringify(response.user));
          toast.success("Ha iniciado sesión correctamente");
          navigate("/admin-panel");
        } else {
          toast.error(
            "No tiene permisos para acceder a esta página, descarga nuestra app móvil"
          );
        }
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error: Failed to login");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen w-screen gap-4 grid place-content-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl text-[#5C7A3F] text-center">
          Panel de Administración de Plantify
        </h1>
        <img
          src="/plantify-logo.webp"
          alt="Plantify Logo"
          className="w-32 h-32"
        />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Ingresar usuario"
            className="border-2 border-[#EAEAEA] rounded-md p-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Ingresar contraseña"
            className="border-2 border-[#EAEAEA] rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#5C7A3F] text-white rounded-full p-2 mt-2"
        >
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}

export default Login;
