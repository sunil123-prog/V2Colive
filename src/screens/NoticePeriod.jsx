import React, { useState } from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from '../components/Footer';


const NoticePeriod = () => {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState({
    noticeDate: "",
    reasonForVacating: "",
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
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow p-4 w-100" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4 text-center">Notice Period Form</h3>
        <Form onSubmit={handleSubmit}>
          {/* Notice Date */}
          <Form.Group className="mb-3">
            <Form.Label>Notice Date</Form.Label>
            <Form.Control
              type="date"
              name="noticeDate"
              value={noticeData.noticeDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Reason for Vacating */}
          <Form.Group className="mb-4">
            <Form.Label>Reason for Vacating</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="reasonForVacating"
              placeholder="Enter reason"
              value={noticeData.reasonForVacating}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Buttons */}
          <Row className="mt-3">
            <Col xs={6} className="d-flex justify-content-start">
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate("/home")}
              >
                Go Back
              </Button>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                Submit Notice
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>

    <Footer />

    </>
  );
};

export default NoticePeriod;
