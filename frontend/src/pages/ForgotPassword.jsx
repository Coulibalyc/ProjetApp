import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      setMessage(response.data.message); // Afficher le message de succès
      setError(""); // Réinitialiser l'erreur
    } catch (err) {
      setError(err.response?.data?.error || "Une erreur est survenue.");
      setMessage(""); // Réinitialiser le message
    }
  };

  return (
    <div 
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
            <div className="card-header bg-success text-white text-center" style={{ borderRadius: "15px 15px 0 0" }}>
              <h3>Réinitialisation du Mot de Passe</h3>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group mb-3">
                <label className="text-success">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: "#f4f4f4", border: "none", borderRadius: "5px" }}
                />
              </div>
              <button
                className="btn btn-success w-100"
                onClick={handleForgotPassword}
                style={{ backgroundColor: "#6DBE45", border: "none", borderRadius: "5px" }}
              >
                Envoyer un lien de réinitialisation
              </button>
              <div className="text-center mt-3">
                <button 
                  className="btn btn-link text-success" 
                  onClick={() => navigate("/")} 
                  style={{ textDecoration: "none" }}
                >
                  Retour à la connexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
