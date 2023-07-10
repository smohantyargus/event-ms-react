import UserContext from "context/user/UserContext";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("userLoginData");
    logout();
    toast.success("Logged out successfully!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login");
  };

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light shadow p-3 mb-3"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="/">
            Event Management System
          </a> */}
          <Link class="navbar-brand" to="/">
            <img src="https://apps.argusoft.com/ems/assets/images/logo.png" />
            {/* Event Management System */}
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                {/* <a class="nav-link" href="/events">
                  Events
                </a> */}
                <Link class="nav-link" to="/events">
                  Events
                </Link>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="/login">
                  Login
                </a> */}
                {/* <Link class="nav-link" to="/login">
                  Login
                </Link> */}
              </li>
            </ul>
          </div>
          <button
            style={{ backgroundColor: "#802f59", borderColor: "#802f59" }}
            class="btn btn-primary my-2 my-sm-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
