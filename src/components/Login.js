import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        dispatch(setUser(user.uid));

        navigate("/task/" + user.uid);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("Some error occured while Login " + errorMessage);
      });
  };
  return (
    <div
      className="p-5"
      style={{ backgroundColor: "#f7ebf6", minHeight: "100vh" }}
    >
      <div
        className="col-sm-5 col-8 col-md-4 col-lg-3 col-xl-3 col-xxl-2 shadow-lg mx-auto  p-5 rounded"
        style={{ backgroundColor: "#fcf5fc" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <div className="mt-2">
          <Link to="/signup"> New User User? SignUp</Link>
        </div>
        <div className="mt-2">
          <Link to="/forgotpassword"> Forgot Password? Reset</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
