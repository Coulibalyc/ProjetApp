import React, { useState } from "react";
import {
  FaTachometerAlt, FaClock, FaBoxOpen, FaCog, FaFileAlt
} from "react-icons/fa";
import { Nav, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "../conponents/Dashboard";
import RealTimeTracking from "../conponents/RealTimeTracking";
import OrderTracking from "../conponents/OrderTracking";
import Reports from "../conponents/Reports";
import Settings from "../conponents/Settings";
import logo from '../assets/logo.jpg';

// Page du Gestionnaire avec sélection de fonctionnalités
const ManagerDashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState("dashboard");
  const [userName, setUserName] = useState("Coulibaly Kiofor");

  // Fonction pour changer la fonctionnalité sélectionnée
  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  // Rendre le composant basé sur la fonctionnalité sélectionnée
  const renderSelectedFeature = () => {
    switch (selectedFeature) {
      case "dashboard":
        return <Dashboard />;  // Le composant Dashboard importé sera rendu ici
      case "realtime":
        return <RealTimeTracking />;  // Le composant Suivi en Temps Réel importé sera rendu ici
      case "orders":
        return <OrderTracking />;  // Le composant Suivi des Commandes importé sera rendu ici
      case "reports":
        return <Reports />;  // Le composant Rapport importé sera rendu ici
      case "settings":
        return <Settings />;  // Le composant Paramètres importé sera rendu ici
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-light p-3"
        style={{
          width: "300px",
          height: "100vh",
          boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRight: "1px solid #ccc",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <img src={logo } alt="Logo" style={{ width: "50px", height: "50px" }} />
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#28a745",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>

        <Nav className="flex-column mb-4">
          <Nav.Item>
            <Nav.Link
              href="#dashboard"
              onClick={() => handleFeatureSelect('dashboard')}
              className={`menu-item p-3 d-flex align-items-center rounded-3 text-dark ${selectedFeature === 'dashboard' ? 'bg-success text-white' : 'hover-bg-light'}`}
            >
              <FaTachometerAlt style={{ marginRight: "10px" }} /> Tableau de Bord
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#realtime"
              onClick={() => handleFeatureSelect('realtime')}
              className={`menu-item p-3 d-flex align-items-center rounded-3 text-dark ${selectedFeature === 'realtime' ? 'bg-success text-white' : 'hover-bg-light'}`}
            >
              <FaClock style={{ marginRight: "10px" }} /> Suivi en Temps Réel
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#orders"
              onClick={() => handleFeatureSelect('orders')}
              className={`menu-item p-3 d-flex align-items-center rounded-3 text-dark ${selectedFeature === 'orders' ? 'bg-success text-white' : 'hover-bg-light'}`}
            >
              <FaBoxOpen style={{ marginRight: "10px" }} /> Suivi des Commandes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#reports"
              onClick={() => handleFeatureSelect('reports')}
              className={`menu-item p-3 d-flex align-items-center rounded-3 text-dark ${selectedFeature === 'reports' ? 'bg-success text-white' : 'hover-bg-light'}`}
            >
              <FaFileAlt style={{ marginRight: "10px" }} /> Rapport
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#settings"
              onClick={() => handleFeatureSelect('settings')}
              className={`menu-item p-3 d-flex align-items-center rounded-3 text-dark ${selectedFeature === 'settings' ? 'bg-success text-white' : 'hover-bg-light'}`}
            >
              <FaCog style={{ marginRight: "10px" }} /> Paramètres
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* Main Content */}
      <Container fluid>
        <Row className="mt-4">
          <Col>
            <h1 className="text-center">Tableau de Bord du Gestionnaire</h1>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>{renderSelectedFeature()}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManagerDashboard;
