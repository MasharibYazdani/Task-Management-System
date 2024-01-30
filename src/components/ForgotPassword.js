import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
      navigate("/login");
    } catch (error) {
      alert("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div
      className="p-5"
      style={{ backgroundColor: "#f7ebf6", minHeight: "100vh" }}
    >
      <div
        className="container mt-5 shadow-lg rounded "
        style={{ backgroundColor: "#fcf5fc" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <label className="fw-bold mb-2">Email:</label>

            <input
              className="form-control mb-2"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-2">
            <button className="btn btn-primary" onClick={handleForgotPassword}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
