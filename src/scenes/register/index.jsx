import React, { useContext, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "api";

import logo from "../../icons/logo.png";
import UserContext from "context/user/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  const role = "USER";

  const toggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user_email = email.split("@")[0];
    const user_email_domain = email.split("@")[1];

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      let data = {
        firstName,
        lastName,
        email,
        password,
        role,
      };

      let otpData = {
        email,
      };

      setVisibilityTrue();
      api
        .post("/auth/signup", data)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          api
            .post("/user/send-otp", otpData)
            .then((res) => {
              navigate(`/new/${response.data.email}`);
              setVisibilityFalse();
              toast.info("Verify User!", {
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
              setVisibilityFalse();
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Invalid User Details!", {
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
  };

  return (
    <div className="register-container">
      <div className="register row shadow">
        <img src={logo} className="arg-logo" alt="argusoft" />
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
          <button
            type="button"
            className="btn mt-2 input show-hide"
            onClick={toggle}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
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
              Register
            </button>
          </div>
          <p class="mt-4">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
