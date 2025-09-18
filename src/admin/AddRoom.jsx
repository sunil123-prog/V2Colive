import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Table,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, clearRoomState, fetchRooms } from "../redux/slices/roomSlice";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNo: "",
    floor: "",
    type: "",
    baseRent: "",
  });

  const dispatch = useDispatch();
  const { loading, error, success, rooms } = useSelector((state) => state.rooms);

  // Load rooms on mount
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Toast notifications
  useEffect(() => {
    if (success) {
      toast.success("✅ Room added successfully!", { transition: Bounce });
      dispatch(clearRoomState());
    }
    if (error) {
      toast.error(`❌ ${error}`, { transition: Bounce });
      dispatch(clearRoomState());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRoom(formData));
    setFormData({ roomNo: "", floor: "", type: "", baseRent: "" });
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Add Room Form */}
        <Col md={5}>
          <Card className="p-4 shadow-sm" style={{ borderRadius: "20px" }}>
            <h4 className="mb-4 text-center">Add New Room</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Room No</Form.Label>
                <Form.Control
                  type="text"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleChange}
                  placeholder="Enter Room No"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Floor</Form.Label>
                <Form.Control
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Enter Floor Number"
                  min="0"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Room Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Room Type --</option>
                  <option value="single">1 Sharing</option>
                  <option value="double">2 Sharing</option>
                  <option value="triple">3 Sharing</option>
                  <option value="quadra">4 Sharing</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Base Rent</Form.Label>
                <Form.Control
                  type="number"
                  name="baseRent"
                  value={formData.baseRent}
                  onChange={handleChange}
                  placeholder="Enter base rent"
                  min="0"
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 rounded-pill mt-3"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Add Room"}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Available Rooms Table */}
        <Col md={7}>
          <Card className="p-4 shadow-sm" style={{ borderRadius: "20px" }}>
            <h4 className="mb-4 text-center">Available Rooms</h4>
            {loading && <Spinner animation="border" />}
            {rooms?.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Room No</th>
                    <th>Floor</th>
                    <th>Type</th>
                    <th>Base Rent</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.roomNo}</td>
                      <td>{room.floor}</td>
                      <td>{room.type}</td>
                      <td>₹{room.baseRent}</td>
                      <td>
                        {room.isOccupied ? (
                          <Badge bg="danger">Occupied</Badge>
                        ) : (
                          <Badge bg="success">Available</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center">No rooms available yet.</p>
            )}
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default AddRoom;
