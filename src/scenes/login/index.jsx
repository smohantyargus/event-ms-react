import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "context/user/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "api";

import logo from "../../icons/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(UserContext);
  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  // useEffect(() => {
  //   // console.log(user);
  // }, [user]);

  const toggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      email,
      password,
    };
    setVisibilityTrue();
    api
      .post("/auth/signin", data)
      .then((response) => {
        // Handle the response
        // console.log(response.data);
        if (response.data.token != null) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
          login(response.data);
          navigate("/");
          setVisibilityFalse();
          toast.success(`Welcome! ${response.data.firstName}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          if (response.data.role === "ADMIN") {
            toast.info("Admin Login!", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
          toast.error("Wrong Credentials!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        // Handle the error
        setVisibilityFalse();
        toast.error("Wrong Credentials!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div class="login row shadow">
        <img src={logo} className="arg-logo" />
        <form onSubmit={handleSubmit}>
          {/* <h2>Event Management System</h2> */}
          <div className="login-header">
            <h3>Event-MS Login</h3>
          </div>
          <input
            type="email"
            id="form3Example3"
            class="form-control form-control-lg input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            id="form3Example4"
            class="form-control form-control-lg input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn mt-2 input" onClick={toggle}>
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <div>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#802f59",
                borderColor: "#802f59",
              }}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p class="mt-4">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
