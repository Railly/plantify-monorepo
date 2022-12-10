import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { User } from "../api";

function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const isAuth = verifyToken();

    if (!isAuth) {
      navigate("/");
    } else {
      getUsers();
    }
  }, []);

  const getRowStyles = (user: User, index: number) => {
    if (user.remainingCredits > 0) {
      if (index % 2 === 0) {
        return "bg-[#677d52] text-white border-white border";
      }
      return "bg-[#5C7A3F] text-white border-white border";
    }
    if (index % 2 === 0) {
      return "bg-white border";
    }
    return "bg-gray-100";
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await api.deleteUser(id);
      if (response.ok) {
        toast.success("User deleted successfully");
        getUsers();
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error: Failed to delete user");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen gap-4 grid place-content-center py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/plantify-logo.webp"
            alt="Plantify Logo"
            className="w-12 h-12"
          />
          <h1 className="font-bold text-2xl text-[#5C7A3F] text-center">
            Panel de Administración de Plantify
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl text-[#5C7A3F] text-center">
            Usuarios
          </h2>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase bg-[#5C7A3F] text-white">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Usuario
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nombre completo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Créditos
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Fecha de creación
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Acciones
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
                      className={`${getRowStyles(
                        user,
                        index
                      )} hover:bg-gray-200 cursor-pointer`}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-semibold whitespace-nowrap"
                      >
                        {user.username}
                      </th>
                      <td className="py-4 px-6">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-4 px-6">{user.email}</td>
                      <td className="py-4 px-6 text-center">
                        {user.remainingCredits ?? 0}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(user.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <button
                            className="bg-rose-500 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 16 16"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => navigate(`/history/${user._id}`)}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                          >
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <desc></desc>
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <polyline points="12 8 12 12 14 14"></polyline>
                              <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path>
                            </svg>
                          </button>
                        </div>
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
