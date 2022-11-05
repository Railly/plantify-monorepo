import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { User } from "../api";

function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.getUsers();
        if (response.ok) {
          setUsers(response.users);
        } else {
          toast.error(`Error: ${response.message}`);
        }
      } catch (error) {
        toast.error("Error: Failed to fetch users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const verifyToken = () => {
      const token = window.localStorage.getItem("token");
      return Boolean(token);
    };

    const isAuth = verifyToken();
    console.log({ isAuth });

    if (!isAuth) {
      navigate("/");
    } else {
      getUsers();
    }
  }, []);

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
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl text-[#5C7A3F] text-center">
            Usuarios
          </h2>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase bg-[#5C7A3F] text-white">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Usuario
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nombre
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Apellido
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Fecha de creación
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="w-full">
                    <td
                      colSpan={6}
                      className="py-3 px-6 text-center text-gray-500"
                    >
                      <span className="flex gap-1 justify-center">
                        Cargando
                        <i>
                          <svg
                            className="animate-spin h-5 w-5 text-[#5C7A3F] flex"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                            ></path>
                          </svg>
                        </i>
                      </span>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user._id}
                      </th>
                      <td className="py-4 px-6">{user.username}</td>
                      <td className="py-4 px-6">{user.firstName}</td>
                      <td className="py-4 px-6">{user.lastName}</td>
                      <td className="py-4 px-6">{user.email}</td>
                      <td className="py-4 px-6">
                        {new Date(user.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="bg-[#5C7A3F] text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

export default AdminPanel;
