import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";

function Header() {
  const [userData, setUserData] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(clearUser());
        setUserData(null);
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    getTaskList();
  }, [user]);

  const getTaskList = () => {
    get(child(ref(db), "users/" + user))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error + "man");
      });
  };

  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid d-flex justify-content-around">
        <div className="text-white fs-3">Task Management System</div>

        {user && userData ? (
          <div className="d-flex">
            <div className="mx-2">
              <div className="text-white text-start">{userData.name}</div>
              <div className="text-white text-start">{userData.email}</div>
            </div>
            <div className="mx-2 mt-1">
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-primary m-1" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div>
              <button className="btn btn-primary m-1" onClick={handleSignup}>
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
