import { Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./pages/admin-panel";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "./pages/history";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/history/:id" element={<History />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
