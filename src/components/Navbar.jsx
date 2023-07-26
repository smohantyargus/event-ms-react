import UserContext from "context/user/UserContext";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "api";
import logo from "../icons/logo.png";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, ButtonBase, Grid } from "@mui/material";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const AllEventsStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
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

  const [allEventsOpen, setAllEventsOpen] = React.useState(false);
  const handleallEventsOpen = () => setAllEventsOpen(true);
  const handleallEventsClose = () => setAllEventsOpen(false);

  const [myAllEvents, setAllMyEvents] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    toast.success("Logged out successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login");
  };

  const handleMyAllEventsClick = () => {
    handleallEventsOpen();
    const userID = JSON?.parse(localStorage.getItem("user")).id;
    api
      .get(`/user/my-events/${userID}`)
      .then((res) => {
        setAllMyEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const userID = JSON?.parse(localStorage.getItem("user")).id;
    api
      .get(`/user/my-events/${userID}`)
      .then((res) => {
        setAllMyEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
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
              <li
                className="nav-link active my-ev"
                style={{
                  border: "2px #802f59 solid",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: "#802f59",
                  cursor: "pointer",
                }}
              >
                <span onClick={handleMyAllEventsClick}>My Events</span>
              </li>
            </ul>
            <form class="d-flex">
              <ButtonBase sx={{ marginRight: "20px", borderRadius: "50%" }}>
                <Avatar
                  {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                  onClick={handleOpen}
                />
              </ButtonBase>
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
                  </Box>
                </Modal>
              </>
              {/* NEW MODAL FOR ALL EVENTS */}
              <>
                <Modal
                  open={allEventsOpen}
                  onClose={handleallEventsClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={AllEventsStyle}>
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                    >
                      My Events
                    </Typography>

                    {myAllEvents.length ? (
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        {myAllEvents?.map((events) => (
                          <Grid
                            item
                            lg={3.8}
                            md={5.8}
                            xs={12}
                            sx={{
                              marginBottom: "10px",
                              marginTop: "10px",
                              marginRight: "5px",
                              marginLeft: "5px",
                              width: "45%",
                              backgroundColor: "#802f59",
                              color: "white",
                              padding: "1rem",
                              borderRadius: "10px",
                            }}
                          >
                            <Typography variant="h5" component="h2">
                              {events?.title}
                            </Typography>
                            <Typography variant="h6" component="h4">
                              {events?.startDate} | {events?.startTime}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography
                        variant="h6"
                        component="h4"
                        sx={{ marginTop: "20px" }}
                      >
                        You have not registered in any events!
                      </Typography>
                    )}
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
