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
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { BASEURL } from "../constants";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    fathersName: "",
    age: "",
    dateOfBirth: "",
    bloodGroup: "",
    roomNo: "",
    mobile: "",
    email: "",
    dateOfJoining: "",
    rentPerMonth: "",
    educationQualification: "",
    employmentIn: "",
    officeAddress: "",
    permanentAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(registerForm)) {
      if (!value && key !== "roomNo" && key !== "rentPerMonth") {
        return `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    }
    if (!/^[0-9]{10}$/.test(registerForm.mobile))
      return "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(registerForm.email))
      return "Enter a valid email address";
    if (registerForm.password.length < 6)
      return "Password must be at least 6 characters";
    if (registerForm.password !== registerForm.confirmPassword)
      return "Passwords do not match";

    return null;
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error, { transition: Bounce });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASEURL}/tenants/register`,
        registerForm,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(registerUser(res.data));
      toast.success("Registration Successful!...", {
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

      setTimeout(() => navigate("/termsandconditions"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "User already exist!", {
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
    } finally {
      setLoading(false);
    }
  };

  // Motion variant for card
  const cardMotion = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Motion variant for image
  const imageMotion = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Motion Image Column */}
        <Col
          xs={12}
          md={6}
          className="p-0 order-1 order-md-2"
          style={{
            position: "sticky",
            top: 0,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <motion.img
            src="/assets/logo-1.png"
            alt="Side Visual"
            initial="hidden"
            animate="visible"
            variants={imageMotion}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>

        {/* Motion Form Column */}
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-start overflow-auto order-2 order-md-1"
          style={{ maxHeight: "100vh", padding: "1rem" }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardMotion}
            className="w-100"
          >
            <Card
              className="rounded-4 shadow-sm my-4 w-100"
              style={{
                maxWidth: "500px",
                padding: "2rem",
                backgroundColor: "#f9f9f9", // light background
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // subtle light shadow
              }}
            >
              <Card.Body>
                <h3
                  className="text-center mb-4 fw-bold"
                  style={{ color: "#333" }}
                >
                  Register
                </h3>
                <Form onSubmit={onSubmitRegister}>
                  {/* Full Name */}
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={registerForm.fullName}
                      onChange={onChangeRegister}
                      placeholder="Enter full name"
                      required
                      autoFocus
                    />
                  </Form.Group>

                  {/* Father's Name */}
                  <Form.Group className="mb-3">
                    <Form.Label>Fathers Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fathersName"
                      value={registerForm.fathersName}
                      onChange={onChangeRegister}
                      placeholder="Enter father's name"
                      required
                    />
                  </Form.Group>

                  {/* Age */}
                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={registerForm.age}
                      onChange={onChangeRegister}
                      placeholder="Enter age"
                      required
                    />
                  </Form.Group>

                  {/* Date of Birth */}
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={registerForm.dateOfBirth}
                      onChange={onChangeRegister}
                      max="9999-12-31"
                      required
                    />
                  </Form.Group>

                  {/* Blood Group */}
                  <Form.Group className="mb-3">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Control
                      type="text"
                      name="bloodGroup"
                      value={registerForm.bloodGroup}
                      onChange={onChangeRegister}
                      placeholder="Enter blood group"
                      required
                    />
                  </Form.Group>

                  {/* Room No */}
                  <Form.Group className="mb-3">
                    <Form.Label>Room No</Form.Label>
                    <Form.Control
                      type="text"
                      name="roomNo"
                      value={registerForm.roomNo}
                      onChange={onChangeRegister}
                      placeholder="Enter room number"
                      disabled
                    />
                  </Form.Group>

                  {/* Mobile */}
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={registerForm.mobile}
                      onChange={onChangeRegister}
                      placeholder="Enter mobile number"
                      required
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={registerForm.email}
                      onChange={onChangeRegister}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  {/* Date of Joining */}
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Joining</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfJoining"
                      value={registerForm.dateOfJoining}
                      onChange={onChangeRegister}
                      max="9999-12-31"
                      required
                    />
                  </Form.Group>

                  {/* Rent Per Month */}
                  <Form.Group className="mb-3">
                    <Form.Label>Rent</Form.Label>
                    <Form.Control
                      type="number"
                      name="rentPerMonth"
                      value={registerForm.rentPerMonth}
                      onChange={onChangeRegister}
                      placeholder="Enter rent amount"
                      disabled
                    />
                  </Form.Group>

                  {/* Education */}
                  <Form.Group className="mb-3">
                    <Form.Label>Education Qualification</Form.Label>
                    <Form.Control
                      type="text"
                      name="educationQualification"
                      value={registerForm.educationQualification}
                      onChange={onChangeRegister}
                      placeholder="Enter qualification"
                      required
                    />
                  </Form.Group>

                  {/* Employment */}
                  <Form.Group className="mb-3">
                    <Form.Label>Employment-In</Form.Label>
                    <Form.Control
                      type="text"
                      name="employmentIn"
                      value={registerForm.employmentIn}
                      onChange={onChangeRegister}
                      placeholder="Enter employment"
                      required
                    />
                  </Form.Group>

                  {/* Office Address */}
                  <Form.Group className="mb-3">
                    <Form.Label>Office Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="officeAddress"
                      value={registerForm.officeAddress}
                      onChange={onChangeRegister}
                      placeholder="Enter office address"
                      required
                    />
                  </Form.Group>

                  {/* Permanent Address */}
                  <Form.Group className="mb-3">
                    <Form.Label>Permant Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="permanentAddress"
                      value={registerForm.permanentAddress}
                      onChange={onChangeRegister}
                      placeholder="Enter permanent address"
                      required
                    />
                  </Form.Group>

                  {/* Upload Aadhar */}
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Aadhar</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg,.jpeg"
                      onChange={onChangeRegister}
                    />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerForm.password}
                        onChange={onChangeRegister}
                        placeholder="Enter password"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={onChangeRegister}
                        placeholder="Confirm password"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Continue"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                  <Link to="/login">Login</Link>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
          <ToastContainer position="top-right" autoClose={3000} />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
