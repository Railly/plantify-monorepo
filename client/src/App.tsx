import { Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./pages/admin-panel";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
