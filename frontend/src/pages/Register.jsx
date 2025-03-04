import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      setMessage("Inscription réussie ! Vous serez redirigé.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white text-center">
              <h3>Inscription</h3>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <div className="form-group mb-3">
                <label>Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Rôle</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Administrateur</option>
                  <option value="manager">Gestionnaire</option>
                  <option value="supplier">Fournisseur</option>
                </select>
              </div>
              <button className="btn btn-success w-100" onClick={handleRegister}>
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
