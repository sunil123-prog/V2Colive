import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";
import { toast, Bounce } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.loggedInUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout Successfully!...", {
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
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Navbar bg="primary" variant="primary" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              filter: "brightness(0) invert(1)",
            }}
          />{" "}
          <span className="fw-bold text-white">V2Colive</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-login" />

        <Navbar.Collapse id="navbar-login" className="justify-content-end">
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {user && (
              <NavDropdown
                title={
                  <span style={{ color: "white" }}>
                    {user?.fullName || user?.email || "User"}
                  </span>
                }
                id="user-dropdown"
                align="start"
                menuVariant="light"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
