import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { termsAccepted } from "../redux/slices/authSlice";

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const registeredUser = useSelector((state) => state.auth.registeredUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!registeredUser) {
      navigate("/register");
    }
  }, [registeredUser, navigate]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleAccept = () => {
  dispatch(termsAccepted());

  toast.success("✅ Terms accepted!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
  });

  setTimeout(() => navigate("/login"), 2000);
};

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        TERMS & CONDITIONS
      </h2>

      {/* Terms Box */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "15px",
        }}
      >
        <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Room rents should be paid before 5th of every month.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            30 Days’ notice period is mandatory before vacating the PG. If one
            month notice is not given, 30 Days rent should be paid.
          </li>

          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            After giving 30 days of notice period:
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: "20px",
                marginTop: "5px",
              }}
            >
              <li style={{ position: "relative", marginBottom: "6px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "-20px",
                    color: "#3498db",
                  }}
                >
                  ➤
                </span>
                If anyone vacates before 15th of the month, rent will be charged
                daily (₹500/day for triple sharing, ₹750/day for double sharing,
                ₹1000/day for single occupancy).
              </li>
              <li style={{ position: "relative", marginBottom: "6px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "-20px",
                    color: "#3498db",
                  }}
                >
                  ➤
                </span>
                If vacating after 15th of the month, full month rent must be
                paid.
              </li>
            </ul>
          </li>

          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            ₹2000/- maintenance charge will be deducted from security deposit at
            time of leaving the PG.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Token advance and rent are non-refundable in case of cancellation.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Damages to beds/PG properties must be paid by tenant.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Management is not responsible for valuables. Keep your keys safe.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Visitors not allowed without owner’s permission.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Cigarette, alcohol strictly prohibited in rooms.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Electric stove, kettle, iron, etc. not allowed (fine ₹1000).
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Cooking not allowed inside PG rooms.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Don’t waste food, power, water, etc.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span style={{ position: "absolute", left: "-20px", color: "red" }}>
              ⚠
            </span>
            Illegal activity = eviction without refund.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span
              style={{ position: "absolute", left: "-20px", color: "#f39c12" }}
            >
              ★
            </span>
            Use dustbins for sanitary pads.
          </li>
          <li style={{ position: "relative", marginBottom: "8px" }}>
            <span style={{ position: "absolute", left: "-20px", color: "red" }}>
              ⚠
            </span>
            PG not responsible for personal matters (love, suicide, etc.).
          </li>
        </ul>
      </div>


      {/* Checkbox */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <input type="checkbox" id="acceptCheck" onChange={handleCheckboxChange} />
        <label htmlFor="acceptCheck" style={{ marginLeft: "10px" }}>
          I am accepting all the above Terms & Conditions
        </label>
      </div>

      <button
        onClick={handleAccept}
        disabled={!isChecked}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isChecked ? "#007bff" : "#ccc",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: isChecked ? "pointer" : "not-allowed",
        }}
      >
        Accept
      </button>

      <ToastContainer />
    </div>
  );
};

export default TermsAndConditions;
