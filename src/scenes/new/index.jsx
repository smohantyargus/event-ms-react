import React, { useContext, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "context/user/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "api";

import logo from "../../icons/logo.png";

const New = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const useremail = user.email;

  // useEffect(() => {
  //   // console.log(user);
  // }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail(user.email);

    let data = {
      email: useremail,
      otp,
    };

    console.log(data);

    api
      .post("/user/verify-otp", data)
      .then((response) => {
        navigate("/login");
        console.log(response);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <div class="login row shadow">
        <img src={logo} className="arg-logo" />
        <form onSubmit={handleSubmit} className="text-center">
          {/* <h2>Event Management System</h2> */}
          <div className="login-header">
            <h3>Event-MS Verify</h3>
          </div>
          <p>OTP has been sent to {user?.email}</p>
          <input
            type="text"
            id="form3Example4"
            class="form-control form-control-lg input"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
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
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;
