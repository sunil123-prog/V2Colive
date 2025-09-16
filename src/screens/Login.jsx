import React, { useState } from "react";
import { Form, Button, Card, Container, InputGroup, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../redux/slices/authSlice";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASEURL } from "../constants";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASEURL}/tenants/login`,
        loginData
      );

      dispatch(loggedInUser(res.data));

      toast.success("Login Successful! Redirecting...", {
        transition: Bounce,
        autoClose: 1000,
      });

      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Backend not reachable. Check server!", {
          transition: Bounce,
          autoClose: 4000,
        });
      } else {
        toast.error(error.response?.data?.message || "Login failed!", {
          transition: Bounce,
          autoClose: 3000,
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
          className="d-flex justify-content-center align-items-start overflow-auto order-2 order-md-1"
          style={{ maxHeight: "100vh", padding: "2rem" }}
        >
          <Card className="p-5 shadow-lg rounded" style={{ width: "100%", maxWidth: "400px" }}>
            {/* <img
              src="/assets/logo-1.png"
              alt=""
              style={{ width: "120px", height: "70px", display: "block", margin: "0 auto 1rem" }}
            /> */}
            <h3 className="text-primary text-center">Welcome to V2Colive</h3>
            <Card.Body>
              <h3 className="text-center mb-4 fw-bold">Login</h3>
              <Form onSubmit={onSubmitLogin}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={loginData.email}
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
        </Col>

        {/* Image Column */}
        <Col
          xs={12}
          md={6}
          className="p-0 order-1 order-md-2 d-flex justify-content-center align-items-center"
          style={{ height: "100", overflow: "hidden" }}
        >
          <img
            src="/assets/logo-1.png"
            alt="Side Visual"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
