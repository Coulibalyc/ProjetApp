import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Button, Form, Table } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState("month");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData(filter);
  }, [filter]);

  // Fonction pour récupérer les données de rapport
  const fetchReportData = async (timeframe) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/reports?timeframe=${timeframe}`);
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des rapports:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  // Téléchargement en PDF (simulation)
  const downloadPDF = () => {
    alert("Téléchargement du rapport au format PDF");
  };

  if (loading) {
    return <div>Chargement des rapports...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h3>Rapport Synthétique</h3>
        </Col>
        <Col className="text-end">
          <Form.Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-auto d-inline-block"
          >
            <option value="week">Cette Semaine</option>
            <option value="month">Ce Mois</option>
            <option value="year">Cette Année</option>
          </Form.Select>
          <Button variant="success" className="ms-3" onClick={downloadPDF}>
            Exporter en PDF
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Body>
              <h5>Statistiques des Commandes</h5>
              <p><strong>Total Commandes:</strong> {data.totalOrders}</p>
              <p><strong>Commandes Terminées:</strong> {data.completedOrders} ({data.completedPercentage}%)</p>
              <p><strong>Commandes Annulées:</strong> {data.canceledOrders} ({data.canceledPercentage}%)</p>
              <p><strong>Commandes en Attente:</strong> {data.pendingOrders} ({data.pendingPercentage}%)</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h5>Distribution des Statuts</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.statusDistribution || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {data.statusDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h5>Commandes par Jour</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.dailyOrders || []}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#4BC0C0" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Optionnellement, afficher les bacs si vous avez cette fonctionnalité */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h5>Informations des Bacs</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Capacité</th>
                    <th>Quantité Actuelle</th>
                    <th>Statut</th>
                    <th>Emplacement</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bins && data.bins.map((bin, index) => (
                    <tr key={index}>
                      <td>{bin.name}</td>
                      <td>{bin.capacity}</td>
                      <td>{bin.currentLevel}</td>
                      <td>{bin.status}</td>
                      <td>{bin.location}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
