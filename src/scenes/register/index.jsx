import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "api";

const Register = () => {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const role = "USER";

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      firstName,
      lastName,
      // username,
      email,
      password,
      role,
    };

    api
      .post("/auth/signup", data)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        localStorage.setItem('token',response.data.token);
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
    <div className="login">
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form onSubmit={handleSubmit}>
            <h2>Event Management System</h2>
            <h3> Register</h3>
            {/* <div class="form-outline mb-4">
              <input
                type="username"
                class="form-control form-control-lg"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div> */}
            <div class="form-outline mb-4">
              <input
                type="firstname"
                class="form-control form-control-lg"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div class="form-outline mb-4">
              <input
                type="lastname"
                class="form-control form-control-lg"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div class="form-outline mb-4">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div class="form-outline mb-3">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
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
              <p class="medium fw-bold mt-2 pt-1 mb-0">
                Already registered ? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
