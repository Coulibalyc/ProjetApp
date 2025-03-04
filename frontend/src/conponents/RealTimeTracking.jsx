import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';

const RealTimeTracking = () => {
  const [bins, setBins] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true); // Suivi en temps réel activé/désactivé
  const [loading, setLoading] = useState(true); // Etat de chargement
  const [lastUpdated, setLastUpdated] = useState(null); // Dernière mise à jour

  // Fonction pour récupérer les bacs
  const fetchBins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/manager');
      const fetchedBins = response.data.bins;
      setBins(fetchedBins);
      setLoading(false); // Fin du chargement
      setLastUpdated(new Date().toLocaleTimeString()); // Mise à jour de l'heure de la dernière actualisation
    } catch (error) {
      console.error('Erreur lors du chargement des bacs:', error);
      setLoading(false);
    }
  };

  // Hook useEffect pour charger les bacs au démarrage
  useEffect(() => {
    fetchBins();
  }, []);

  // Hook useEffect pour gérer le suivi en temps réel
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/dashboard/updates');
          const updatedBins = response.data.bins;
          setBins(updatedBins);
          setLastUpdated(new Date().toLocaleTimeString()); // Mise à jour du timestamp de la dernière mise à jour
        } catch (error) {
          console.error('Erreur lors de la mise à jour en temps réel:', error);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]); // Assurer que le hook dépend de realTimeUpdates

  // Changer la couleur en fonction du niveau
  const getBinColor = (level) => {
    if (level < 30) return '#ffcccc'; // Critique
    if (level < 60) return '#ffeb99'; // Bas
    return '#e6ffe6'; // Normal
  };

  return (
    <div>
      <Row className="mb-3">
        <Col md={12} className="text-center">
          <Button
            variant={realTimeUpdates ? 'danger' : 'outline-primary'}
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          >
            {realTimeUpdates ? 'Arrêter Suivi en Temps Réel' : 'Activer Suivi en Temps Réel'}
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} className="text-center">
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <p><strong>Dernière mise à jour:</strong> {lastUpdated}</p>
          )}
        </Col>
      </Row>

      <Row>
        {bins.map((bin) => (
          <Col md={4} key={bin.id} className="mb-3">
            <Card
              className="shadow"
              style={{ backgroundColor: getBinColor(bin.currentLevel) }}
            >
              <Card.Body>
                <h6>{bin.name}</h6>
                <p><strong>Niveau actuel:</strong> {bin.currentLevel}%</p>
                <p><strong>Capacité:</strong> {bin.capacity} kg</p>
                <Badge
                  variant={bin.currentLevel < 30 ? 'danger' : bin.currentLevel < 60 ? 'warning' : 'success'}
                  className="float-right"
                >
                  {bin.currentLevel < 30 ? 'Critique' : bin.currentLevel < 60 ? 'Bas' : 'OK'}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RealTimeTracking;
