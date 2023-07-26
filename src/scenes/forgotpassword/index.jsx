import React, { useContext, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { toast } from "react-toastify";
import api from "api";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import logo from "../../icons/logo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  const handleReset = (e) => {
    const resetPassData = {
      email,
      newPassword,
      otp,
    };
    e.preventDefault();
    setVisibilityTrue();
    api
      .post("/auth/reset-password", resetPassData)
      .then((res) => {
        setVisibilityFalse();
        handleClose();
        toast.success("Password Updated Successfully", {
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
      })
      .catch((error) => {
        setVisibilityFalse();
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    const otpData = {
      email,
    };
    e.preventDefault();
    setVisibilityTrue();
    api
      .post("/user/send-otp", otpData)
      .then((res) => {
        setVisibilityFalse();
        handleOpen();
        toast.info("OTP Sent!", {
          position: "bottom-center",
          autoClose: 3000,
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
  };

  return (
    <div className="login-container">
      <div class="login row shadow">
        <img src={logo} className="arg-logo" alt="Argusoft" />
        <form onSubmit={handleSubmit}>
          <div className="login-header">
            <h3>Forgot Password</h3>
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
          <div className="mb-4">
            <button
              // type="button"
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
              Proceed
            </button>
          </div>
          <Link to="/login">No I want to Login</Link>
        </form>
      </div>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Reset Password
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <input
                type="email"
                id="form3Example3"
                class="form-control form-control-lg input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <input
                type="password"
                id="form3Example3"
                class="form-control form-control-lg input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg input"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <button
                style={{
                  backgroundColor: "#802f59",
                  borderColor: "#802f59",
                }}
                class="btn btn-primary my-2 my-sm-0 d-flex"
                onClick={handleReset}
              >
                Reset
              </button>
            </Typography>
          </Box>
        </Modal>
      </>
    </div>
  );
};

export default ForgotPassword;
