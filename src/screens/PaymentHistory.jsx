import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Table,
  Button,
  Pagination,
} from "react-bootstrap";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const PaymentHistory = () => {
  const navigate = useNavigate();

  const [billing] = useState({
    currentDue: 12000,
    lastPaid: 10000,
    dueDate: "20-Sep-2025",
  });

  const [paymentHistory] = useState([
    {
      id: 1,
      date: "20-Aug-2025",
      amount: 10000,
      status: "Paid",
      method: "UPI",
      receipt: "/receipts/aug.pdf",
    },
    {
      id: 2,
      date: "20-Jul-2025",
      amount: 10000,
      status: "Paid",
      method: "Card",
      receipt: "/receipts/jul.pdf",
    },
    {
      id: 3,
      date: "20-Jun-2025",
      amount: 10000,
      status: "Paid",
      method: "Bank Transfer",
      receipt: "/receipts/jun.pdf",
    },
    {
      id: 4,
      date: "20-May-2025",
      amount: 10000,
      status: "Paid",
      method: "UPI",
      receipt: "/receipts/may.pdf",
    },
    {
      id: 5,
      date: "20-Apr-2025",
      amount: 10000,
      status: "Paid",
      method: "UPI",
      receipt: "/receipts/apr.pdf",
    },
    {
      id: 6,
      date: "20-Mar-2025",
      amount: 10000,
      status: "Paid",
      method: "Card",
      receipt: "/receipts/mar.pdf",
    },
  ]);

  // ===== Pagination State =====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPayments = paymentHistory.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);

  // ====== Date Handling for Highlight ======
  const today = new Date();
  const dueDate = new Date(billing.dueDate);
  let dueHighlight = "";

  if (dueDate < today) {
    dueHighlight = "text-danger fw-bold";
  } else if ((dueDate - today) / (1000 * 60 * 60 * 24) <= 7) {
    dueHighlight = "text-warning fw-bold";
  }

  // ====== Summary Calculations ======
  const totalPaid = paymentHistory.reduce((acc, item) => acc + item.amount, 0);

  return (
    <>
      <Container className="mt-4">
        <h3 className="mb-2">Payment History</h3>
        <p className="text-muted">
          Track your past rent payments and download receipts
        </p>

        {/* Billing Summary */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="text-center">
              <Col xs={12} md={4} className="mb-2 mb-md-0">
                <strong>Current Due:</strong> ₹{billing.currentDue}
              </Col>
              <Col xs={12} md={4} className="mb-2 mb-md-0">
                <strong>Last Paid:</strong> ₹{billing.lastPaid}
              </Col>
              <Col xs={12} md={4}>
                <strong>Next Due Date:</strong>{" "}
                <span className={dueHighlight}>{billing.dueDate}</span>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Payment Table */}
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td>₹{payment.amount}</td>
                  <td>
                    <span className="badge bg-success">{payment.status}</span>
                  </td>
                  <td>{payment.method}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      href={payment.receipt}
                      target="_blank"
                      download
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination with Back & Forward */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-3">
            {/* Back Button */}
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronCircleLeft />
            </Pagination.Prev>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            {/* Forward Button */}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronCircleRight />
            </Pagination.Next>
          </Pagination>
        )}

        {/* Summary Card */}
        <Card className="mt-4 shadow-sm">
          <Card.Body className="text-center">
            <Row>
              <Col>
                <h6>Total Paid This Year</h6>
                <p className="fw-bold text-success">₹{totalPaid}</p>
              </Col>
              <Col>
                <h6>Total Pending</h6>
                <p className="fw-bold text-danger">₹{billing.currentDue}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Back to Home */}
        <div className="text-start mt-3">
          <Button variant="secondary" onClick={() => navigate("/home")}>
            Back
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentHistory;
