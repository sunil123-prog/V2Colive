import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Reusable Card Component
const InfoCard = ({
  title,
  texts,
  buttonLabel,
  dueText,
  icon,
  onButtonClick,
  animation,
}) => (
  <motion.div
    initial={{ opacity: 0, x: animation === "left" ? -100 : 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <Card
      className="shadow-sm border-0 rounded-3 h-100 position-relative"
      style={{ backgroundColor: "#e9f5ff" }}
    >
      {/* Top-right Icon */}
      {icon && (
        <div
          style={{
            position: "absolute",
            top: "-15px",
            right: "-15px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={icon}
            alt={`${title} icon`}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </div>
      )}

      <Card.Body
        className="d-flex flex-column justify-content-between"
        style={{ minHeight: "150px" }}
      >
        <div>
          <Card.Title className="fw-bold">{title}</Card.Title>
          <ul className="mb-2">
            {texts.map((text, idx) => (
              <li key={idx}>{text}</li>
            ))}
          </ul>
          {dueText && <h6 className="mt-2" style={{color: "#e74c3c"}}>{dueText}</h6>}
        </div>

        {/* Button */}
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={onButtonClick}>
            {buttonLabel} <FaChevronCircleRight />
          </Button>
        </div>
      </Card.Body>
    </Card>
  </motion.div>
);

const PaymentCard = () => {
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    console.log("Perform payment actions...");
    navigate("/paymentHistory");
  };

  const handleNoticeClick = () => {
    console.log("Perform notice actions...");
    navigate("/noticePeriod");
  };

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col md={6}>
          <InfoCard
            title="Track Your Payments"
            texts={[
              "All your payments in one place",
              "Due dates & paid bills.",
            ]}
            buttonLabel="View Payments"
            dueText="Due: ₹ 2,500/-"
            icon="/assets/paymenticon.png"
            onButtonClick={handlePaymentClick}
            animation="left" 
          />
        </Col>
        <Col md={6}>
          <InfoCard
            title="Notice Period"
            texts={[
              "Notify the owner 30 days before leaving.",
              "To avoid deductions or extra charges.",
              "Clear all dues before leaving.",
              
            ]}
            buttonLabel="View Notice Policy"
            icon="/assets/noticeperiodicon.png"
            onButtonClick={handleNoticeClick}
            animation="right" 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentCard;
