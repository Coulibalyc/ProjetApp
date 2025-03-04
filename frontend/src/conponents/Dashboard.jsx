import React, { useEffect, useState } from 'react'; // Importation des hooks React
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie,
} from 'recharts'; // Importation des composants nécessaires pour les graphiques
import { Card, Row, Col, Button } from 'react-bootstrap'; // Importation des composants de layout de React Bootstrap

const Dashboard = () => {
  // État pour stocker les données des bacs et graphiques
  const [bins, setBins] = useState([]); // Bacs
  const [chartData, setChartData] = useState([]); // Données pour le graphique à barres
  const [distributionPieData, setDistributionPieData] = useState([]); // Données pour le graphique circulaire
  const [selectedTimeframe, setSelectedTimeframe] = useState('Semaine'); // Période sélectionnée (par défaut 'Semaine')
  const [showBinsCards, setShowBinsCards] = useState(false); // Contrôle de l'affichage des cartes des bacs
  const [selectedBin, setSelectedBin] = useState(null); // Bac sélectionné pour afficher ses données

  // Effet secondaire pour charger les données des bacs depuis l'API
  useEffect(() => {
    const fetchBins = async () => {
      try {
        // Requête HTTP pour récupérer les données des bacs
        const response = await axios.get('http://localhost:5000/api/dashboard/manager');
        const fetchedBins = response.data.bins; // On extrait les données des bacs
        setBins(fetchedBins); // Mettre à jour l'état des bacs avec les données reçues

        // Par défaut, afficher les données hebdomadaires
        updateChartData('Semaine', fetchedBins);
        // Préparer les données pour le graphique circulaire (distribution des bacs)
        setDistributionPieData(fetchedBins.map((bin) => ({
          name: bin.name,
          value: bin.currentLevel, // Utiliser le niveau actuel de chaque bac
        })));
      } catch (error) {
        console.error('Erreur lors du chargement des bacs:', error); // Gérer les erreurs
      }
    };

    fetchBins(); // Appel de la fonction pour charger les données
  }, []); // Cette fonction s'exécute uniquement au montage du composant

  // Fonction pour générer une consommation aléatoire entre 1 et 10% de la capacité du bac
  const getRandomConsumption = (capacity) => Math.floor(Math.random() * (capacity * 0.1)) + 1;

  // Fonction pour calculer la consommation en fonction du timeframe (période sélectionnée)
  const calculateConsumption = (timeframe, bin) => {
    const now = new Date(); // Date actuelle
    const consumptionData = []; // Tableau pour stocker les données de consommation

    switch (timeframe) {
      case 'Aujourd\'hui':
        // Consommation pour aujourd'hui
        consumptionData.push({
          label: `Jour ${bin.name}`,
          consommation: getRandomConsumption(bin.capacity), // Consommation aléatoire pour aujourd'hui
        });
        break;

      case 'Semaine':
        // Consommation pour chaque jour de la semaine
        for (let i = 0; i < 7; i++) {
          const day = new Date(now);
          day.setDate(now.getDate() - i); // Modifier la date pour chaque jour précédent
          consumptionData.push({
            label: `${day.toLocaleDateString()}`, // Afficher la date
            consommation: getRandomConsumption(bin.capacity), // Consommation aléatoire pour chaque jour
          });
        }
        break;

      case 'Mois':
        // Consommation pour chaque semaine du mois
        for (let i = 0; i < 4; i++) {
          const week = new Date(now);
          week.setDate(now.getDate() - i * 7); // Modifier la date pour chaque semaine
          consumptionData.push({
            label: `Semaine ${week.toLocaleDateString()}`, // Afficher la date de la semaine
            consommation: getRandomConsumption(bin.capacity), // Consommation aléatoire pour chaque semaine
          });
        }
        break;

      case 'Année':
        // Consommation pour chaque mois de l'année
        for (let i = 0; i < 12; i++) {
          const month = new Date(now);
          month.setMonth(now.getMonth() - i); // Modifier la date pour chaque mois
          consumptionData.push({
            label: `${month.toLocaleDateString()}`, // Afficher la date du mois
            consommation: getRandomConsumption(bin.capacity), // Consommation aléatoire pour chaque mois
          });
        }
        break;

      default:
        break;
    }

    return consumptionData; // Retourner les données de consommation
  };

  // Met à jour les données du graphique en fonction du timeframe et des bacs récupérés
  const updateChartData = (timeframe, fetchedBins = bins) => {
    if (fetchedBins.length === 0) return; // Si aucun bac, ne rien faire

    // Mettre à jour les données en fonction du bac sélectionné ou de tous les bacs
    const newData = selectedBin ? calculateConsumption(timeframe, selectedBin) : [];
    setChartData(newData); // Mettre à jour les données du graphique
  };

  // Gérer le changement de période sélectionnée (Aujourd'hui, Semaine, Mois, Année)
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe); // Mettre à jour le timeframe sélectionné
    updateChartData(timeframe); // Mettre à jour les graphiques avec la nouvelle période
  };

  // Afficher ou masquer les cartes des bacs
  const handleShowBinsCards = () => {
    setShowBinsCards(!showBinsCards); // Alterner l'affichage des cartes
  };

  // Sélectionner un bac et mettre à jour les données du graphique en fonction du bac sélectionné
  const handleBinSelect = (bin) => {
    setSelectedBin(bin); // Sélectionner un bac
    updateChartData(selectedTimeframe, [bin]); // Mettre à jour le graphique avec les données du bac sélectionné
  };

  return (
    <div className="mt-4">
      <Row className="mb-3">
        <Col md={2} className="d-flex flex-column">
          {/* Barre verticale de navigation pour sélectionner la période */}
          <Card className="shadow h-100" style={{ backgroundColor: '#f5f5f5' }}>
            <Card.Body className="d-flex flex-column justify-content-around">
              {['Aujourd\'hui', 'Semaine', 'Mois', 'Année'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'success' : 'outline-success'} // Modifier le style du bouton sélectionné
                  onClick={() => handleTimeframeChange(timeframe)} // Appeler la fonction de changement de période
                  className="mb-3"
                  style={{ color: '#fff', backgroundColor: selectedTimeframe === timeframe ? '#6a9e3b' : '#a0d39e' }}
                >
                  {timeframe}
                </Button>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={10}>
          <Row className="mb-4">
            {/* Cartes des informations générales */}
            <Col md={3}>
              <Card className="shadow" onClick={handleShowBinsCards}>
                <Card.Body>
                  <Card.Title style={{ color: '#6a9e3b' }}>Total des Bacs</Card.Title>
                  <Card.Text>{bins.length}</Card.Text> {/* Affiche le nombre total de bacs */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title style={{ color: '#6a9e3b' }}>Bacs sous le seuil</Card.Title>
                  <Card.Text>{bins.filter((bin) => bin.currentLevel < 30).length}</Card.Text> {/* Affiche le nombre de bacs sous le seuil */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title style={{ color: '#6a9e3b' }}>Capteurs Actifs</Card.Title>
                  <Card.Text>8</Card.Text> {/* Affiche le nombre de capteurs actifs */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title style={{ color: '#6a9e3b' }}>Capteurs Hors-Service</Card.Title>
                  <Card.Text>2</Card.Text> {/* Affiche le nombre de capteurs hors-service */}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Afficher les cartes des bacs individuels */}
          {showBinsCards && (
            <Row>
              {bins.map((bin) => (
                <Col md={4} key={bin.id}>
                  <Card
                    className={`shadow mb-3 ${selectedBin && selectedBin.id === bin.id ? 'selected' : ''}`}
                    onClick={() => handleBinSelect(bin)} // Sélectionner le bac
                    style={{
                      backgroundColor: selectedBin && selectedBin.id === bin.id ? '#c7f3c2' : '#e9f7e9', // Style conditionnel
                      border: selectedBin && selectedBin.id === bin.id ? '2px solid #6a9e3b' : '1px solid #ccc', // Bordure différente pour le bac sélectionné
                    }}
                  >
                    <Card.Body>
                      <Card.Title style={{ color: '#6a9e3b' }}>{bin.name}</Card.Title>
                      <Card.Text>Niveau actuel : {bin.currentLevel}</Card.Text> {/* Afficher le niveau actuel du bac */}
                      <Card.Text>Capacité : {bin.capacity}</Card.Text> {/* Afficher la capacité du bac */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Graphiques */}
          <Row>
            <Col md={6}>
              <Card className="shadow">
                <Card.Header className="bg-success text-white">
                  Consommation ({selectedTimeframe}) {/* Affiche la période sélectionnée */}
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    {/* Graphique à barres de consommation */}
                    <BarChart data={chartData}>
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consommation" fill="#6a9e3b" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow">
                <Card.Header className="bg-warning text-white">
                  Distribution par Bac
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    {/* Graphique circulaire de distribution */}
                    <PieChart>
                      <Pie
                        data={distributionPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" cy="50%"
                        outerRadius={80} fill="#6a9e3b"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
