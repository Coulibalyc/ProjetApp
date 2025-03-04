import React, { useState } from "react";
import { Button, Card, Col, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [threshold, setThreshold] = useState(30); // Seuil de réapprovisionnement
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light"); // Thème clair par défaut
  const [language, setLanguage] = useState("fr"); // Langue par défaut : français
  const [autoUpdate, setAutoUpdate] = useState(false); // Mises à jour automatiques désactivées par défaut
  const [history, setHistory] = useState([]); // Historique des seuils
  const [backupEnabled, setBackupEnabled] = useState(false); // Sauvegarde automatique
  const navigate = useNavigate();

  // Appliquer le thème
  const applyTheme = () => {
    const body = document.body;
    if (theme === "dark") {
      body.classList.add("bg-dark", "text-white");
      body.classList.remove("bg-light", "text-dark");
    } else {
      body.classList.add("bg-light", "text-dark");
      body.classList.remove("bg-dark", "text-white");
    }
  };

  const handleSaveSettings = () => {
    // Ajouter le seuil actuel à l'historique
    setHistory((prevHistory) => [
      ...prevHistory,
      { date: new Date().toLocaleString(), value: threshold },
    ]);

    console.log({
      threshold,
      notificationsEnabled,
      theme,
      language,
      autoUpdate,
      backupEnabled,
    });

    alert("Paramètres sauvegardés avec succès !");
  };

  const handleResetSettings = () => {
    setThreshold(30);
    setNotificationsEnabled(true);
    setTheme("light");
    setLanguage("fr");
    setAutoUpdate(false);
    setBackupEnabled(false);
    alert("Paramètres réinitialisés !");
  };

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Déconnexion réussie !");
    navigate("/"); // Rediriger vers la page de connexion
  };

  // Appliquer le thème à chaque changement
  React.useEffect(() => {
    applyTheme();
  }, [theme]);

  return (
    <div className="p-3">
      <h2 className="mb-4">Paramètres</h2>

      {/* Seuil de réapprovisionnement */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Seuil de Réapprovisionnement</Card.Title>
          <Form.Group controlId="threshold">
            <Form.Label>
              Niveau minimum pour le réapprovisionnement automatique (%)
            </Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Notifications */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Notifications</Card.Title>
          <Form.Check
            type="switch"
            id="notifications-switch"
            label="Activer les notifications"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </Card.Body>
      </Card>

      {/* Thème */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Thème de l'Interface</Card.Title>
          <ToggleButtonGroup
            type="radio"
            name="theme-options"
            value={theme}
            onChange={(val) => setTheme(val)}
            className="d-flex"
          >
            <ToggleButton id="light-theme" value="light" variant="outline-dark">
              Clair
            </ToggleButton>
            <ToggleButton id="dark-theme" value="dark" variant="outline-dark">
              Sombre
            </ToggleButton>
          </ToggleButtonGroup>
        </Card.Body>
      </Card>


      {/* Mises à jour automatiques */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Mises à Jour Automatiques</Card.Title>
          <Form.Check
            type="switch"
            id="auto-update-switch"
            label="Activer les mises à jour automatiques des capteurs"
            checked={autoUpdate}
            onChange={() => setAutoUpdate(!autoUpdate)}
          />
        </Card.Body>
      </Card>

      {/* Sauvegarde automatique */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Sauvegarde Automatique</Card.Title>
          <Form.Check
            type="switch"
            id="backup-switch"
            label="Activer les sauvegardes automatiques"
            checked={backupEnabled}
            onChange={() => setBackupEnabled(!backupEnabled)}
          />
        </Card.Body>
      </Card>

      {/* Historique */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Historique des Seuils</Card.Title>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                {entry.date} - {entry.value}%
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      {/* Actions */}
      <Row className="mb-3">
        <Col>
          <Button variant="success" className="w-100" onClick={handleSaveSettings}>
            Sauvegarder
          </Button>
        </Col>
        <Col>
          <Button variant="danger" className="w-100" onClick={handleResetSettings}>
            Réinitialiser
          </Button>
        </Col>
      </Row>

      {/* Déconnexion */}
      <Row>
        <Col>
          <Button variant="secondary" className="w-100" onClick={handleLogout}>
            Déconnexion
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
