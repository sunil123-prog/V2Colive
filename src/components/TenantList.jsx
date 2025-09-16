import React, { useState } from "react";
import tenants from '../tenants.json';
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        {currentTenants.map((tenant) => (
          <Col md={4} key={tenant.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={tenant.image}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{tenant.name}</Card.Title>
                <Card.Text>
                  <strong>Rent:</strong> ₹{tenant.rent}
                </Card.Text>
                <Card.Text>Description: {tenant.description}</Card.Text>
                <Link to={`/tenant/${tenant.id}`}>
                  <Button variant="primary">View More</Button>
                </Link>
              </Card.Body>
            </Card>
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
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
}

export default TenantList;
