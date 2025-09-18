import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const NoticePeriod = () => {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState({
    proposedExitOn: "",
    notes: "",
  });

  const handleChange = (e) => {
    setNoticeData({
      ...noticeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notice Data Submitted:", noticeData);
    toast.success("Notice submitted successfully!");
  };

  return (
    <>
      <Container
        fluid
        className="min-vh-100 d-flex justify-content-center align-items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-100"
        >
          <Card
            className="shadow-lg p-4 border-0 rounded-4 w-100"
            style={{
              maxWidth: "600px",
              background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
            }}
          >
            <motion.h3
              className="mb-4 text-center fw-bold"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{ color: "#198754" }}
            >
              📝 Notice Period Form
            </motion.h3>

            <Form onSubmit={handleSubmit}>
              {/* Notice Date */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Notice Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="proposedExitOn"
                    value={noticeData.proposedExitOn}
                    onChange={handleChange}
                    required
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>
              </motion.div>

              {/* Reason for Vacating */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Reason for Vacating
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="notes"
                    placeholder="Enter your reason..."
                    value={noticeData.notes}
                    onChange={handleChange}
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Row className="mt-3">
                  <Col xs={6} className="d-flex justify-content-start">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => navigate("/home")}
                      className="rounded-pill px-4"
                    >
                      ⬅ Go Back
                    </Button>
                  </Col>
                  <Col xs={6} className="d-flex justify-content-end">
                    <Button
                      variant="success"
                      type="submit"
                      className="rounded-pill px-4 shadow-sm"
                    >
                      🚀 Submit
                    </Button>
                  </Col>
                </Row>
              </motion.div>
            </Form>
          </Card>
        </motion.div>
      </Container>

      <Footer />
    </>
  );
};

export default NoticePeriod;
