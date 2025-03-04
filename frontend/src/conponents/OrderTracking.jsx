import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaPlusCircle, FaEdit, FaTrash, FaClock } from "react-icons/fa";
import { Card, Row, Col, Button, Table, Form, Badge, Modal } from "react-bootstrap";

const OrderTracking = () => {
  const [commandes, setCommandes] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCommande, setNewCommande] = useState({ name: "", quantity: 0 });
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les commandes depuis l'API
  const fetchCommandes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/commandes");
      const fetchedCommandes = response.data.commandes;
      setCommandes(fetchedCommandes);
      setFilteredCommandes(fetchedCommandes);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour passer une nouvelle commande
  const placeCommande = async () => {
    if (!newCommande.name || newCommande.quantity <= 0) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/commandes", newCommande);
      fetchCommandes(); // Recharger les commandes après l'ajout
      setShowModal(false); // Fermer le modal
      setNewCommande({ name: "", quantity: 0 }); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      alert("Erreur : Impossible de passer la commande.");
    }
  };

  // Fonction pour modifier une commande
  const updateCommande = async () => {
    if (!newCommande.name || newCommande.quantity <= 0 || !newCommande.status) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/commandes/${newCommande._id}`, {
        name: newCommande.name,
        quantity: newCommande.quantity,
        status: newCommande.status, // Inclure le statut
      });
  
      fetchCommandes(); // Recharger les commandes après la mise à jour
      setShowModal(false); // Fermer le modal
      setNewCommande({ name: "", quantity: 0, status: "en_attente" }); // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande:", error);
      alert("Erreur : Impossible de modifier la commande.");
    }
  };
  

  // Fonction pour mettre à jour le statut d'une commande
  const updateCommandeStatus = async (commandeId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/commandes/${commandeId}`, { status });
      fetchCommandes(); // Recharger les commandes après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la commande:", error);
      alert("Erreur : Impossible de mettre à jour le statut de la commande.");
    }
  };

  // Fonction pour filtrer les commandes
  const filterCommandes = () => {
    let filtered = commandes;
    if (statusFilter !== "all") {
      filtered = filtered.filter((commande) => commande.status === statusFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter((commande) =>
        commande.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commande._id.toString().includes(searchQuery)
      );
    }
    setFilteredCommandes(filtered);
  };

  // Supprimer une commande
  const deleteCommande = async (commandeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/commandes/${commandeId}`);
      fetchCommandes();
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande:", error);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  // Affichage conditionnel basé sur l'état de chargement
  if (loading) {
    return <div>Chargement des commandes...</div>;
  }

  // Vérification pour s'assurer que filteredCommandes est un tableau avant d'utiliser .map()
  if (!Array.isArray(filteredCommandes)) {
    return <div>Aucune commande disponible</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5>Statistiques des Commandes</h5>
          <div>
            <p><strong>Total Commandes:</strong> {commandes.length}</p>
            <p><strong>Commandes en Attente:</strong> {commandes.filter(commande => commande.status === 'en_attente').length}</p>
            <p><strong>Commandes Terminées:</strong> {commandes.filter(commande => commande.status === 'terminee').length}</p>
            <p><strong>Commandes Annulées:</strong> {commandes.filter(commande => commande.status === 'annulee').length}</p>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Rechercher par nom ou ID de commande"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              filterCommandes();
            }}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              filterCommandes();
            }}
          >
            <option value="all">Tous les Statuts</option>
            <option value="en_attente">En Attente</option>
            <option value="terminee">Terminées</option>
            <option value="annulee">Annulées</option>
          </Form.Select>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlusCircle /> Passer une Commande
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                   
                    <th>Nom de la Commande</th>
                    <th>Status</th>
                    <th>Status Fournisseur</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommandes.map((commande) => (
                    <tr key={commande._id}>
                      
                      <td>{commande.name}</td>
                      <td>
                      <Badge
                          pill
                          bg={
                            commande.status === "en_attente"
                              ? "warning"
                              : commande.status === "terminee"
                              ? "success"
                              : "danger"
                          }
                        >
                          {commande.status === "en_attente" && <FaClock />}
                          {commande.status === "terminee" && <FaCheckCircle />}
                          {commande.status === "annulee" && <FaTimesCircle />}
                          {" "}
                          {commande.status.charAt(0).toUpperCase() + commande.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                            <Badge
                              pill
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
                              {commande.supplierStatus === "non_traite" && <FaClock />}
                              {commande.supplierStatus === "en_cours" && <FaSpinner />}
                              {commande.supplierStatus === "terminee" && <FaCheckCircle />}
                              {commande.supplierStatus === "echoue" && <FaTimesCircle />}
                              {commande.supplierStatus
                                .charAt(0)
                                .toUpperCase() + commande.supplierStatus.slice(1).replace('_', ' ')}
                            </Badge>
                      </td>
                      <td>
                        {commande.status === "en_attente" && (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => updateCommandeStatus(commande._id, "terminee")}
                            >
                              <FaCheckCircle /> Terminer
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => updateCommandeStatus(commande._id, "annulee")}
                            >
                              <FaTimesCircle /> Annuler
                            </Button>
                          </>
                        )}
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => {
                            setNewCommande({ ...commande });
                            setShowModal(true);
                          }}
                        >
                          <FaEdit /> Modifier
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteCommande(commande._id)}
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
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newCommande._id ? "Modifier la Commande" : "Passer une Nouvelle Commande"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de la commande"
                value={newCommande.name}
                onChange={(e) => setNewCommande({ ...newCommande, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantité"
                value={newCommande.quantity}
                onChange={(e) => setNewCommande({ ...newCommande, quantity: parseInt(e.target.value, 10) })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select
                value={newCommande.status}
                onChange={(e) => setNewCommande({ ...newCommande, status: e.target.value })}
              >
                <option value="en_attente">En Attente</option>
                <option value="terminee">Terminée</option>
                <option value="annulee">Annulée</option>
              </Form.Select>
            </Form.Group>
              <Button
                variant="primary"
                onClick={() => (newCommande._id ? updateCommande() : placeCommande())}
              >
                {newCommande._id ? "Modifier" : "Ajouter"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  
  export default OrderTracking;