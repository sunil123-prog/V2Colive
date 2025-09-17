// Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaMoneyBillWave,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const footerMotion = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemMotion = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.footer
      className="bg-dark text-light mt-5 pt-4 pb-3"
      initial="hidden"
      animate="visible"
      variants={footerMotion}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* Quick Links */}
          <Col md={4} sm={12} className="mb-3">
            <motion.h6 className="fw-bold" variants={itemMotion}>
              Quick Links
            </motion.h6>
            <ul className="list-unstyled">
              <motion.li variants={itemMotion}>
                <Link to="/home" className="text-light text-decoration-none">
                  <FaHome className="me-2" /> Dashboard
                </Link>
              </motion.li>
              <motion.li variants={itemMotion}>
                <Link to="/paymentHistory" className="text-light text-decoration-none">
                  <FaMoneyBillWave className="me-2" /> Payments
                </Link>
              </motion.li>
              <motion.li variants={itemMotion}>
                <Link to="/profile" className="text-light text-decoration-none">
                  <FaUser className="me-2" /> Profile
                </Link>
              </motion.li>
              <motion.li variants={itemMotion}>
                <Link to="/noticePeriod" className="text-light text-decoration-none">
                  <FaEnvelope className="me-2" /> Notices
                </Link>
              </motion.li>
            </ul>
          </Col>

          {/* Social Media Links */}
          <Col md={4} sm={12} className="mb-3">
            <motion.h6 className="fw-bold" variants={itemMotion}>
              Follow Us
            </motion.h6>
            <motion.p variants={itemMotion}>Stay connected with us on social media:</motion.p>
            <motion.div className="d-flex gap-3 fs-4" variants={itemMotion}>
              <a href="#" className="text-light hover-effect"><FaFacebook /></a>
              <a href="#" className="text-light hover-effect"><FaInstagram /></a>
              <a href="#" className="text-light hover-effect"><FaTwitter /></a>
              <a href="#" className="text-light hover-effect"><FaLinkedin /></a>
            </motion.div>
          </Col>

          {/* Quote */}
          <Col md={4} sm={12} className="mb-3">
            <motion.h6 className="fw-bold" variants={itemMotion}>
              Quote
            </motion.h6>
            <motion.p className="fst-italic" variants={itemMotion}>
              "A well-managed home makes a happy life."
            </motion.p>
          </Col>
        </Row>

        <Row className="pt-3 border-top border-secondary">
          <Col className="text-center small">
            <motion.div variants={itemMotion}>
              © {new Date().getFullYear()} Tenant Portal. All rights reserved.
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.footer>
  );
};

export default Footer;
