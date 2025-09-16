import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Terms from "./components/Terms";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";
import { useSelector } from "react-redux";
import PaymentHistory from "./screens/PaymentHistory";
import NoticePeriod from "./screens/NoticePeriod";

function App() {

   const user = useSelector((state) => state.auth.loggedInUser);
  return (
    <Router>
       {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termsandconditions" element={<Terms />} />
        <Route path="/paymentHistory" element={<PaymentHistory />} />
        <Route path="/noticePeriod" element={<NoticePeriod />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }

            
        />

        {/* <Route path="/" element={<Home />} /> */}

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
