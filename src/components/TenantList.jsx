import React, { useState } from "react";
import tenants from "../tenants.json";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function TenantList() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // ✅ Show 6 per page (3 per row, 2 rows)

  // Calculate total pages
  const totalPages = Math.ceil(tenants.length / cardsPerPage);

  // Get tenants for current page
  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentTenants = tenants.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Our PG</h1>
      <Row>
        {currentTenants.map((tenant, index) => (
          <Col md={4} key={tenant.id} className="mb-4">
            {/* Motion wrapper for scroll animation */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="shadow-sm border-0 rounded-3" style={{height: "500px"}}>
                <Card.Img
                  variant="top"
                  src={tenant.image}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{tenant.name}</Card.Title>
                  <Card.Text>Description: {tenant.description}</Card.Text>
                  <Link to={`/tenants/${tenant.id}`}>
                    <Button variant="primary">View More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={currentPage === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
}

export default TenantList;
