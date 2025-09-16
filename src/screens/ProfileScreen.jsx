import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../redux/slices/tenantApiSlice";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  const user = JSON.parse(localStorage.getItem("user"));
  const tenantId = user?.tenantId;

  const [updateProfileData, setUpdateProfileData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch profile when tenantId is available
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

    // Password validation
    if (
      updateProfileData.password &&
      updateProfileData.password !== updateProfileData.confirmPassword
    ) {
      toast.error("Passwords do not match!");
      return;
    }

    // Prepare payload
    const payload = {
      fullName: updateProfileData.fullName,
      ...(updateProfileData.password && { password: updateProfileData.password }),
    };

    // Dispatch Redux updateProfile thunk
    try {
      const resultAction = await dispatch(updateProfile({ tenantId, payload }));
      if (updateProfile.fulfilled.match(resultAction)) {
        toast.success("Profile Updated Successfully!");
        navigate("/home");
      } else {
        toast.error(resultAction.payload || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="shadow p-4 w-100" style={{ maxWidth: "600px" }}>
          <h3 className="mb-4 text-center">Update Profile</h3>
          <Form onSubmit={onChangeSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={updateProfileData.fullName}
                placeholder="Enter your full name"
                onChange={onChangeUpdate}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updateProfileData.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={updateProfileData.mobile}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={updateProfileData.password}
                placeholder="Enter new password"
                onChange={onChangeUpdate}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={updateProfileData.confirmPassword}
                placeholder="Confirm new password"
                onChange={onChangeUpdate}
              />
            </Form.Group>

            <Row className="mt-3">
              <Col xs={6} className="d-flex justify-content-start">
                <Button variant="secondary" type="button" onClick={() => navigate("/home")}>
                  Go Back
                </Button>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Update Profile
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

export default ProfileScreen;
