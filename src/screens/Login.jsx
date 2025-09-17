import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../redux/slices/authSlice";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { BASEURL } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginData, setLoginData] = useState({
    identifier: "", password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const isEmail = /\S+@\S+\.\S+/.test(loginData.identifier);
      const payload = isEmail ? {
        email: loginData.identifier, password: loginData.password
      } : {
        mobile: loginData.identifier, password: loginData.password
      }
      const res = await axios.post(`${BASEURL}/tenants/login`, payload);
      dispatch(loggedInUser(res.data));

      toast.success("Login Successful!...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Backend not reachable. Check server!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(error.response?.data?.message || "Login failed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Form Column */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center overflow-auto order-2 order-md-1"
          style={{ padding: "2rem" }}
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-100"
          >
            <Card
              className="rounded-4 shadow-sm p-4"
              style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h3 className="text-primary text-center mb-3">
                Welcome to V2Colive
              </h3>
              <Card.Body>
                <h3 className="text-center mb-4 fw-bold">Login</h3>
                <Form onSubmit={onSubmitLogin}>
                  {/* Email or Mobile */}
                  <Form.Group className="mb-3" controlId="formIdentifier">
                    <Form.Label>Email or Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter email or mobile number"
                      name="identifier"
                      value={loginData.identifier}
                      onChange={onChangeLogin}
                      required
                    />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={onChangeLogin}
                        placeholder="Enter password"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* Submit */}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <span>Don’t have an account? </span>
                  <Link to="/register">Register</Link>
                </div>
              </Card.Body>
            </Card>
            <ToastContainer />
          </motion.div>
        </Col>

        {/* Image Column */}
        <Col
          xs={12}
          md={6}
          className="p-0 order-1 order-md-2 d-flex justify-content-center align-items-center"
        >
          <motion.img
            src="/assets/logo-1.png"
            alt="Side Visual"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
