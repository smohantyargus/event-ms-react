import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "context/user/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

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
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div class="form-outline mb-3">
              <input
                type={showPassword ? "text" : "password"}
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="btn mt-2" onClick={toggle}>
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
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
