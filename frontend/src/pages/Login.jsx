import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from '../assets/image3.jpeg'; // Assurez-vous que l'importation de l'image est correcte
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Sauvegarder le token et les informations utilisateur
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Rediriger selon le rôle
      const role = response.data.user.role;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "manager") {
        navigate("/manager");
      } else if (role === "supplier") {
        navigate("/supplier");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Rediriger vers la page de réinitialisation du mot de passe
  };

  return (
    <div 
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`, // Ajout d'un dégradé sombre
        backgroundSize: 'cover', // Permet à l'image de couvrir l'élément sans déformation
        backgroundPosition: 'center center', // Centrer l'image
        backgroundRepeat: 'no-repeat', // Empêche l'image de se répéter
        minHeight: '100vh', // Hauteur minimale de 100% de la fenêtre
        color: '#fff',
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <div className="card shadow-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '15px' }}>
            <div className="card-header bg-success text-white text-center" style={{ borderRadius: '15px 15px 0 0' }}>
              <h3>Connexion</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group mb-3">
                <label className="text-success">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#f4f4f4', border: 'none', borderRadius: '5px' }}
                />
              </div>
              <div className="form-group mb-3">
                <label className="text-success">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#f4f4f4', border: 'none', borderRadius: '5px' }}
                />
              </div>
              <button 
                className="btn btn-success w-100 mb-3" 
                onClick={handleLogin} 
                style={{ backgroundColor: '#6DBE45', border: 'none', borderRadius: '5px' }}
              >
                Se connecter
              </button>
              <div className="text-center">
                <button 
                  className="btn btn-link text-success" 
                  onClick={handleForgotPassword} 
                  style={{ textDecoration: 'none' }}
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
