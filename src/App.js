import "./App.css";

import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Header from "./components/Header";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";

import ForgotPassword from "./components/ForgotPassword";

function App() {
  // const user = useSelector(selectUser);
  const user = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Provider store={userStore}>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/task/:id",
        element: <Body />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },
]);
export default App;
