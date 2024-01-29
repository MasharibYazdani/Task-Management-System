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
    <div className="m-5 d-flex justify-content-center">
      <div className=" h">
        <label className="fw-bold">Email:</label>

        <input
          className="rounded m-2"
          style={{ height: "40px", width: "400px" }}
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
  );
}

export default ForgotPassword;
