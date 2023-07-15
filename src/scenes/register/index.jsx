import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "api";

import logo from "../../icons/logo.png";

const Register = () => {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const role = "USER";

  const toggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    api
      .post("/auth/signup", data)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/login");
        toast.success("User Registered!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  return (
    <div className="register-container">
      <div className="register row shadow">
        <img src={logo} className="arg-logo" />
        <form onSubmit={handleSubmit}>
          <div className="register-header">
            <h3>Event-MS Register</h3>
          </div>

          <input
            type="firstname"
            class="form-control form-control-lg input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="lastname"
            class="form-control form-control-lg input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            class="form-control form-control-lg input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type={showPassword ? "text" : "password"}
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
              Register
            </button>
          </div>
          <p class="mt-4">
            Already registered ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
