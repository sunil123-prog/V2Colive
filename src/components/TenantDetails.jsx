import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import tenants from "../tenants.json";
import { motion } from "framer-motion";

const TenantDetails = () => {
  const { id } = useParams();
  const tenant = tenants.find((t) => t.id === parseInt(id));

  if (!tenant) {
    return (
      <Container className="text-center mt-5">
        <h3>PG not found</h3>
        <Link to="/tenants">
          <Button variant="secondary" className="mt-3">
            Back to List
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm">
            <Row className="g-0">
              {/* Image Left with Animation */}
              <Col md={5}>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card.Img
                    src={tenant.image}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </motion.div>
              </Col>

              {/* Details Right with Animation */}
              <Col md={7}>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, type: "spring" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card.Body>
                    <h2>{tenant.name}</h2>
                    <p className="mt-3">{tenant.description}</p>

                    <h5>Facilities:</h5>
                    <ListGroup className="mb-3">
                      <ListGroup.Item>✅ High-speed WiFi</ListGroup.Item>
                      <ListGroup.Item>✅ Daily Housekeeping</ListGroup.Item>
                      <ListGroup.Item>✅ Meals included</ListGroup.Item>
                      <ListGroup.Item>✅ 24/7 Security</ListGroup.Item>
                    </ListGroup>

                    <Link to="/">
                      <Button variant="outline-secondary">
                        Back to PG List
                      </Button>
                    </Link>
                  </Card.Body>
                </motion.div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TenantDetails;
