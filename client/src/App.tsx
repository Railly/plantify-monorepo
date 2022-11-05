import { Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./pages/admin-panel";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
