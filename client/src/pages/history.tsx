import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api, { History } from "../api";

function HistoryPage() {
  const { id } = useParams();
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await api.getHistoryByUser(id);
        if (response.ok) {
          setHistory(response.history);
        } else {
          toast.error(`Error: ${response.message}`);
        }
      } catch (error) {
        toast.error("Error: Failed to get history");
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

    if (!isAuth) {
      navigate("/");
    } else {
      getHistory();
    }
  }, []);

  const getRowStyles = (index: number) => {
    if (index % 2 === 0) {
      return "bg-white border";
    }
    return "bg-gray-100";
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
            Historial
          </h2>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase bg-[#5C7A3F] text-white">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    _id
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Contenido
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
                  history.map((historyRecord, index) => {
                    const content = JSON.parse(
                      historyRecord.content.replaceAll("'", '"')
                    );
                    return (
                      <tr className={getRowStyles(index)}>
                        <th
                          scope="row"
                          className="py-4 px-6 font-semibold whitespace-nowrap"
                        >
                          {historyRecord._id}
                        </th>
                        <td className="py-4 px-6">
                          <ul className="list-disc list-inside">
                            {Object.keys(content).map((key) => (
                              <li key={key}>
                                <span className="font-bold">{key}</span>:{" "}
                                {JSON.stringify(content[key], null, 2)}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-4 px-6">
                          {new Date(historyRecord.createdAt).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="bg-[#5C7A3F] text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("historyRecord");
            navigate("/");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

export default HistoryPage;
