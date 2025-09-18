import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AddTenant = () => {
  const [addTenantData, setAddTenantData] = useState({
    fullName: "",
    phone: "",
    email: "",
    startDate: "",
    currentRoomId: "",
  });

  const [tenants, setTenants] = useState([]); // store tenant list

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTenantData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add tenant to list
    setTenants((prev) => [...prev, { ...addTenantData, id: Date.now() }]);

    // Reset form
    setAddTenantData({
      fullName: "",
      phone: "",
      email: "",
      startDate: "",
      currentRoomId: "",
    });
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Left Side - Form */}
        <Col md={6}>
          <Card className="p-4 shadow-sm g-2" style={{ borderRadius: "20px" }}>
            <h4 className="mb-4 text-center">Add New Tenant</h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={addTenantData.fullName}
                      onChange={handleChange}
                      placeholder="Enter tenant full name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={addTenantData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={addTenantData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={addTenantData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Room ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="currentRoomId"
                      value={addTenantData.currentRoomId}
                      onChange={handleChange}
                      placeholder="Enter assigned room ID"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Add Tenant Button */}
              <Button
                type="submit"
                variant="success"
                className="w-100 rounded-pill mt-3"
              >
                ➕ Add Tenant
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right Side - Tenant List */}
        <Col md={6}>
          <Card
            className="p-4 shadow-sm g-2"
            style={{ borderRadius: "20px", minHeight: "370px" }}
          >
            <h4 className="mb-4 text-center">Tenant List</h4>
            {tenants.length === 0 ? (
              <p className="text-center text-muted">No tenants added yet.</p>
            ) : (
              <ListGroup style={{ maxHeight: "280px", overflowY: "auto" }}>
                {tenants.map((tenant) => (
                  <ListGroup.Item
                    key={tenant.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{tenant.fullName}</strong> <br />
                      <small>{tenant.email}</small> <br />
                      <small>📞 {tenant.phone}</small> <br />
                      <small>🏠 Room: {tenant.currentRoomId}</small> <br />
                      <small>📅 {tenant.startDate}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>

      {/* Go Back Button (centered below both cards) */}
     
            <div className="mt-4">
          <Link to="/ownerhome">
            <Button variant="secondary">⬅ Go Back</Button>
          </Link>
       </div>
     
    </Container>
  );
};

export default AddTenant;
