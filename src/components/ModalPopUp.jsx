import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const listVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const LoginPopup = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (location.pathname === "/home") {
      setShow(true);
    }
  }, [location]);

  const handleClose = () => {
    setShow(false);
  };

  const rules = [
    "Room rent should be paid before the 5th of every month.",
    "Notice period is accepted only on the 1st or 5th of the month.",
    "Before vacating the PG, you should inform the management 30 days in advance; otherwise, the advance will not be refundable.",
    "The management is not responsible for your valuable belongings. You should take care of your mobile, laptop, wallet, cupboards, etc.",
    "If you want to vacate after one month, the remaining days will be charged at Rs. 500 per day.",
    "Rs. 2,000 as maintenance charge will be deducted from your security deposit at the time of leaving the PG.",
    "Guest accommodation charges, with or without food, are Rs. 500 per day.",
  ];

  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e67e22", "#1abc9c"]; 

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
      animation={false}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="text-white">Important Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <ol className="custom-list">
            {rules.map((rule, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listVariants}
                style={{
                  marginBottom: "10px",
                  fontWeight: 500,
                  color: colors[index % colors.length], 
                }}
              >
                {rule}
              </motion.li>
            ))}
          </ol>

          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rules.length * 0.2 + 0.5, duration: 0.6 }}
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: 600,
              fontSize: "16px",
              color: "#2c3e50",
            }}
          >
            "Thank you, Welcome to V2CoLive!..."
          </motion.div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </motion.div>
    </Modal>
  );
};

export default LoginPopup;
