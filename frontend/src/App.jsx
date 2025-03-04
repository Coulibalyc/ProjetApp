import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";
import SupplierPage from "./pages/Supplier";
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;




