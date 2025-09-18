import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import {
  FaHome,
  FaMoneyBillWave,
  FaUserFriends,
  FaExclamationTriangle,
  FaUserPlus,
  FaDoorOpen,
  FaFileInvoice,
  FaBell,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const OwnerHome = () => {
  return (
    <>
      <Container fluid className="p-4 bg-light">
        <Row className="mb-4 g-2">
          {/* First Row */}
          <Col md={4}>
            <Card
              className="p-3 bg-light h-100 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaUserFriends size={28} className="text-white" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-1">Total Tenants</h6>
                  <h4 className="mb-0">12</h4>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="p-3 bg-light h-100 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaMoneyBillWave size={28} className="text-white" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-1">Collected (Aug)</h6>
                  <h4 className="mb-0">₹45,000</h4>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="p-3 bg-light h-100 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-warning d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaExclamationTriangle size={28} className="text-white" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-1">Pending (Aug)</h6>
                  <h4 className="mb-0">₹10,000</h4>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4 g-2">
          {/* Second Row */}
          <Col md={4}>
            <Card
              className="p-3 bg-light h-100 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-info d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaBuilding size={28} className="text-white" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-1">Total Rooms Available</h6>
                  <h4 className="mb-0">5</h4>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="p-3 bg-light h-100 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaHome size={28} className="text-white" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-1">Occupied Rooms</h6>
                  <h4 className="mb-0">10</h4>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="p-3 bg-light h-100 shadow-sm"
              style={{ borderRadius: "25px" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-danger d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaSignOutAlt size={28} className="text-white" />
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-1">Total Vacates (This Month)</h6>
                  <h4 className="mb-0">2</h4>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Buttons For Owner Add Tenants, rooms, generate bills, remind */}
        <Row className="mb-4 text-center g-2">
          <Col md={3}>
          <Link to="/addtenant">
            <Button variant="primary" className="w-100 rounded-pill">
              <FaUserPlus className="me-2" /> Add Tenant
            </Button>
            </Link>
          </Col>
          <Col md={3}>
          <Link to='/addroom'>
            <Button variant="primary" className="w-100 rounded-pill">
              <FaDoorOpen className="me-2" /> Add Room
            </Button>
            </Link>
          </Col>
          <Col md={3}>
            <Button variant="primary" className="w-100 rounded-pill">
              <FaFileInvoice className="me-2" /> Generate Bills
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="primary" className="w-100 rounded-pill">
              <FaBell className="me-2" /> Remind
            </Button>
          </Col>
        </Row>

        <Row className="g-2">
          {/* Pending Dues */}
          <Col md={6}>
            <Card className="shadow-sm p-3" style={{ borderRadius: "25px" }}>
              <Card.Header className="d-flex justify-content-between">
                <strong>Pending Dues</strong>
                <span>Aug 2025</span>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>John Doe</strong> • Room 101 <br />{" "}
                    <small>Due 05 Aug</small>
                  </span>
                  <strong>₹5,500</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Aisha Khan</strong> • Room 203 <br />{" "}
                    <small>Due 05 Aug</small>
                  </span>
                  <strong>₹5,000</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Rahul M</strong> • Room 115 <br />{" "}
                    <small>Due 06 Aug</small>
                  </span>
                  <strong>₹6,200</strong>
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer>
                <Button variant="success" className="w-100 rounded-pill">
                  Send All via WhatsApp
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          {/* Recent Receipts */}
          <Col md={6}>
            <Card className="shadow-sm p-3" style={{ borderRadius: "25px" }}>
              <Card.Header className="d-flex justify-content-between">
                <strong>Recent Receipts</strong>
                <span>Last 7 days</span>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Priya R</strong> <br />{" "}
                    <small>RCPT-128 • 04 Aug</small>
                  </span>
                  <strong className="text-success">₹5,000</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>John Doe</strong> <br />{" "}
                    <small>RCPT-127 • 05 Aug</small>
                  </span>
                  <strong className="text-success">₹5,500</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <strong>Mehul P</strong> <br />{" "}
                    <small>RCPT-126 • 03 Aug</small>
                  </span>
                  <strong className="text-success">₹4,800</strong>
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer>
                <Button
                  variant="outline-primary"
                  className="w-100 rounded-pill"
                >
                  View All Receipts
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OwnerHome;
