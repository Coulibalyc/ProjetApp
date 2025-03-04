import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Badge, Card, Row, Col, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SuivieCommande = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  // Charger les commandes depuis l'API
  const fetchCommandes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/commandes");
      setCommandes(response.data.commandes);
    } catch (err) {
      setError("Erreur lors du chargement des commandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // Mettre à jour le statut d'une commande
  const handleUpdateStatus = async (commandeId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/commandes/${commandeId}`, { supplierStatus: status });
      fetchCommandes(); // Recharger les commandes après mise à jour
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.");
    }
  };

  // Supprimer une commande
  const handleDeleteCommande = async (commandeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/commandes/${commandeId}`);
      fetchCommandes(); // Recharger les commandes après suppression
    } catch (err) {
      setError("Erreur lors de la suppression de la commande.");
    }
  };

  // Ouvrir le modal pour mettre à jour une commande
  const handleOpenModal = (commande) => {
    setSelectedCommande(commande);
    setShowModal(true);
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setSelectedCommande(null);
    setShowModal(false);
  };

  // Mettre à jour une commande depuis le modal
  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/commandes/${selectedCommande._id}`, selectedCommande);
      fetchCommandes();
      handleCloseModal();
    } catch (err) {
      setError("Erreur lors de la mise à jour de la commande.");
    }
  };

  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          
        </Col>
      </Row>
      <Card className="shadow">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                
                <th>Nom</th>
                <th>Quantité</th>
                <th>Statut Général</th>
                <th>Statut Fournisseur</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <tr key={commande._id}>
                  
                  <td>{commande.name}</td>
                  <td>{commande.quantity}</td>
                  <td>
                    <Badge
                      bg={
                        commande.status === "en_attente"
                          ? "warning"
                          : commande.status === "terminee"
                          ? "success"
                          : "danger"
                      }
                    >
                      {commande.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      bg={
                        commande.supplierStatus === "non_traite"
                          ? "secondary"
                          : commande.supplierStatus === "en_cours"
                          ? "info"
                          : commande.supplierStatus === "terminee"
                          ? "success"
                          : "danger"
                      }
                    >
                      {commande.supplierStatus}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => handleOpenModal(commande)}
                    >
                      <FaEdit /> Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={() => handleUpdateStatus(commande._id, "terminee")}
                    >
                      <FaCheckCircle /> Terminer
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="me-2"
                      onClick={() => handleUpdateStatus(commande._id, "echoue")}
                    >
                      <FaTimesCircle /> Échouer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteCommande(commande._id)}
                    >
                      <FaTrash /> Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal pour modifier une commande */}
      {selectedCommande && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier Commande</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCommande.name}
                  onChange={(e) =>
                    setSelectedCommande({ ...selectedCommande, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantité</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedCommande.quantity}
                  onChange={(e) =>
                    setSelectedCommande({ ...selectedCommande, quantity: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Enregistrer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SuivieCommande;
