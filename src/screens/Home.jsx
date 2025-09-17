import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import tenants from "../tenants.json";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import TenantList from "../components/TenantList";
import PaymentCard from "../components/PaymentCard";
import Footer from "../components/Footer";
import ModalPopUp from "../components/ModalPopUp";
function Home() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Container fluid className="p-0">
        <ModalPopUp /> 
        <Carousel
          activeIndex={index}
          onSelect={(i) => setIndex(i)}
          interval={2000}
          pause={false}
          className="w-100"
        >
          {tenants.map((tenant, idx) => (
            <Carousel.Item key={idx}>
              <motion.img
                className="d-block w-100"
                src={tenant.image}
                alt={tenant.name}
                style={{
                  width: "100vw",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "0px",
                }}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              />
              <Carousel.Caption
                as={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h3 whileHover={{ scale: 1.1 }}>{tenant.name}</motion.h3>
                <motion.p whileHover={{ scale: 1.05 }}>
                  {tenant.description}
                </motion.p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <PaymentCard />
      <TenantList />

      <Footer />
    </>
  );
}

export default Home;
