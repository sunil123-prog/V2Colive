// Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4} sm={12} className="mb-3">
            <h5>Tenant Portal</h5>
            <p className="small">
              Manage your rent payments, view history, and track your account
              details easily in one place.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} sm={12} className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/home" className="text-light text-decoration-none">Dashboard</a></li>
              <li><a href="/payments" className="text-light text-decoration-none">Payments</a></li>
              <li><a href="/profile" className="text-light text-decoration-none">Profile</a></li>
              <li><a href="/support" className="text-light text-decoration-none">Support</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4} sm={12} className="mb-3">
            <h6>Contact Us</h6>
            <p className="small mb-1">📍 123 Tenant Street, City</p>
            <p className="small mb-1">📞 +91 98765 43210</p>
            <p className="small">✉️ support@tenantportal.com</p>
          </Col>
        </Row>

        <Row className="pt-3 border-top border-secondary">
          <Col className="text-center small">
            © {new Date().getFullYear()} Tenant Portal. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
