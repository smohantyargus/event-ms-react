import React, { useContext, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
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
        if (response.data.token != null) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("npc", response.data.needForPasswordChange);
          localStorage.setItem("enabled", response.data.enabled);
          login(response.data);
          navigate("/");
          setVisibilityFalse();
          toast.success(`Welcome! ${response.data.firstName}`, {
            position: "bottom-center",
            autoClose: 3000,
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
              autoClose: 3000,
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
            autoClose: 3000,
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
        setVisibilityFalse();
        toast.error("Wrong Credentials!", {
          position: "bottom-center",
          autoClose: 3000,
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
        <img src={logo} className="arg-logo" alt="Argusoft" />
        <form onSubmit={handleSubmit}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "inherit",
            }}
          >
            <button
              type="button"
              className="mt-2 input show-hide"
              onClick={toggle}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            <Link style={{ marginLeft: "auto" }} to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <div>
            <button
              class="btn btn-primary"
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
