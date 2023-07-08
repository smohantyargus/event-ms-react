import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "context/user/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, logout } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      email,
      password,
    };

    axios
      .post("http://localhost:9090/login", data)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        if (response.data.loginData === "success") {
          login(response.data.userData);
        }
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
            alt="s"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form onSubmit={handleSubmit}>
            <h2>Event Management System</h2>
            <h3> Login</h3>
            <div class="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div class="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Enter password"
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
                }}
                onClick={handleSubmit}
              >
                Login
              </button>
              <p class="medium fw-bold mt-2 pt-1 mb-0">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;