import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="/">
            Event Management System
          </a> */}
          <Link class="navbar-brand" to="/">
            Event Management System
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
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
