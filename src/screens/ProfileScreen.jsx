import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../redux/slices/tenantApiSlice";
import { motion } from "framer-motion";
import { BASEURL } from "../constants";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  const user = JSON.parse(localStorage.getItem("user"));
  const tenantId = user?.tenantId;

  console.log("Tenant ID:", tenantId);

  const [updateProfileData, setUpdateProfileData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch profile
  useEffect(() => {
    if (tenantId) dispatch(fetchProfile(tenantId));
  }, [dispatch, tenantId]);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setUpdateProfileData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        mobile: profile.mobile || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profile]);

  const onChangeUpdate = (e) => {
    setUpdateProfileData({
      ...updateProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSubmit = async (e) => {
    e.preventDefault();

    if (
      updateProfileData.password &&
      updateProfileData.password !== updateProfileData.confirmPassword
    ) {
      toast.error("Passwords do not match!", {
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
      return;
    }

    const payload = {
      fullName: updateProfileData.fullName,
      ...(updateProfileData.password && {
        password: updateProfileData.password,
      }),
    };

    try {
      const resultAction = await dispatch(updateProfile({ tenantId, payload }));
      if (updateProfile.fulfilled.match(resultAction)) {
        toast.success("Profile Updated!...", {
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
        navigate("/home");
      } else {
        toast.error(resultAction.payload || "Failed to update profile", {
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
    } catch (err) {
      toast.error("Something went wrong. Try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
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
            className="shadow-lg p-4 border-0 rounded-4"
            style={{
              maxWidth: "700px",
              width: "100%",
              background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
            }}
          >
            <Row className="align-items-center">
              {/* Left Column: Form */}
              <Col md={7}>
                <motion.h3
                  className="mb-4 text-center fw-bold"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{ color: "#0d6efd" }}
                >
                  👤 Update Profile
                </motion.h3>

                <Form onSubmit={onChangeSubmit}>
                  {/* Full Name */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={updateProfileData.fullName}
                      placeholder="Enter your full name"
                      onChange={onChangeUpdate}
                      className="rounded-3 shadow-sm"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={updateProfileData.email}
                      placeholder="Enter your email"
                      onChange={onChangeUpdate}
                      className="rounded-3 shadow-sm"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Mobile No</Form.Label>
                    <Form.Control
                      type="mobile"
                      name="mobile"
                      value={updateProfileData.mobile}
                      placeholder="Enter your Mobile No"
                      onChange={onChangeUpdate}
                      className="rounded-3 shadow-sm"
                      disabled
                    />
                  </Form.Group>

                  {/* New Password */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      New Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={updateProfileData.password}
                      placeholder="Enter new password"
                      onChange={onChangeUpdate}
                      className="rounded-3 shadow-sm"
                    />
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={updateProfileData.confirmPassword}
                      placeholder="Confirm new password"
                      onChange={onChangeUpdate}
                      className="rounded-3 shadow-sm"
                    />
                  </Form.Group>

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
                        variant="primary"
                        type="submit"
                        className="rounded-pill px-4 shadow-sm"
                      >
                        💾 Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>

              {/* Right Column: Image / Emoji */}
              <Col
                md={5}
                className="d-flex justify-content-center align-items-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Example: emoji */}
                  <span style={{ fontSize: "5rem" }}>📝</span>
                  {/* OR replace with image */}
                  {/* <img src="/assets/logo.png" alt="Profile Update" style={{ width: '100%', borderRadius: '1rem' }} /> */}
                </motion.div>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </Container>

      <Footer />
    </>
  );
};

export default ProfileScreen;
