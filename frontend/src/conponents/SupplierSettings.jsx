import React, { useState } from "react";
import { Button, Card, Col, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SupplierSettings = () => {
  const [stockLevel, setStockLevel] = useState(100); // Niveau de stock
  const [orderNotifications, setOrderNotifications] = useState(true); // Notifications de commandes
  const [productPricing, setProductPricing] = useState(true); // Tarification dynamique activée
  const [deliveryConditions, setDeliveryConditions] = useState("standard"); // Conditions de livraison
  const [lowStockAlert, setLowStockAlert] = useState(10); // Seuil pour alerte de stock bas
  const [saleHistory, setSaleHistory] = useState([]); // Historique des ventes
  const navigate = useNavigate();

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Déconnexion réussie !");
    navigate("/"); // Rediriger vers la page de connexion
  };

  const handleSaveSettings = () => {
    console.log({
      stockLevel,
      orderNotifications,
      productPricing,
      deliveryConditions,
      lowStockAlert,
    });

    alert("Paramètres sauvegardés avec succès !");
  };

  const handleResetSettings = () => {
    setStockLevel(100);
    setOrderNotifications(true);
    setProductPricing(true);
    setDeliveryConditions("standard");
    setLowStockAlert(10);
    alert("Paramètres réinitialisés !");
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">Paramètres Fournisseur</h2>

      {/* Niveau de stock */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Gestion du Stock</Card.Title>
          <Form.Group controlId="stockLevel">
            <Form.Label>Niveau de stock actuel</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={stockLevel}
              onChange={(e) => setStockLevel(parseInt(e.target.value, 10))}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Alerte de stock bas */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Alerte de Stock Bas</Card.Title>
          <Form.Group controlId="lowStockAlert">
            <Form.Label>Seuil d'alerte pour stock bas (%)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={lowStockAlert}
              onChange={(e) => setLowStockAlert(parseInt(e.target.value, 10))}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Notifications de commandes */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Notifications de Commandes</Card.Title>
          <Form.Check
            type="switch"
            id="orderNotifications"
            label="Activer les notifications de nouvelles commandes"
            checked={orderNotifications}
            onChange={() => setOrderNotifications(!orderNotifications)}
          />
        </Card.Body>
      </Card>

      {/* Tarification dynamique */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Tarification Dynamique</Card.Title>
          <Form.Check
            type="switch"
            id="productPricing"
            label="Activer la tarification dynamique"
            checked={productPricing}
            onChange={() => setProductPricing(!productPricing)}
          />
        </Card.Body>
      </Card>

      {/* Conditions de livraison */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Conditions de Livraison</Card.Title>
          <Form.Control
            as="select"
            value={deliveryConditions}
            onChange={(e) => setDeliveryConditions(e.target.value)}
          >
            <option value="standard">Livraison standard</option>
            <option value="express">Livraison express</option>
            <option value="pickup">Retrait en magasin</option>
          </Form.Control>
        </Card.Body>
      </Card>

      {/* Historique des ventes */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Historique des Ventes</Card.Title>
          <ul>
            {saleHistory.map((entry, index) => (
              <li key={index}>
                {entry.date} - {entry.product} - {entry.quantity} unités
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

export default SupplierSettings;
