import UserContext from "context/user/UserContext";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../icons/logo.png";
// import SearchBar from "scenes/search-bar";
// import axios from "axios";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, ButtonBase } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Navbar = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          <Link class="navbar-brand" to="/">
            <img src={logo} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul
              class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              // style="--bs-scroll-height: 100px;"
            >
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  style={{
                    border: "2px #802f59 solid",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor: "#802f59",
                  }}
                  to="/events"
                >
                  Events
                </Link>
              </li>
              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Link
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
            <form class="d-flex">
              <ButtonBase sx={{ marginRight: "20px" }}>
                <Avatar
                  {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                  onClick={handleOpen}
                />
              </ButtonBase>
              {/* <button
                type="button"
                class="btn btn-outline-dark my-2 mx-5 my-sm-0 d-flex"
                onClick={handleOpen}
              >
                {user.firstName}
              </button> */}
              <>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      User Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Name: {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Email: {user?.email}
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <button
                        style={{
                          backgroundColor: "#802f59",
                          borderColor: "#802f59",
                        }}
                        class="btn btn-primary my-2 my-sm-0 d-flex"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </Typography> */}
                  </Box>
                </Modal>
              </>
              <button
                style={{ backgroundColor: "#802f59", borderColor: "#802f59" }}
                class="btn btn-primary my-2 my-sm-0 d-flex"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
