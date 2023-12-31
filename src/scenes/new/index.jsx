import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import UserContext from "context/user/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "api";

import logo from "../../icons/logo.png";

const New = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  const { email } = useParams();

  const resendOtp = () => {
    setMinutes(5);
    setSeconds(0);
    let otpData = {
      email,
    };

    api.post("/user/send-otp", otpData).then((res) => {
      toast.info("Otp has been resent!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      email,
      otp,
    };

    setVisibilityTrue();
    api
      .post("/user/verify-otp", data)
      .then((response) => {
        navigate("/login");
        setVisibilityFalse();
        toast.success("User Verified!", {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  return (
    <div className="login-container">
      <div class="login row shadow">
        <img src={logo} className="arg-logo" alt="Argusoft" />
        <form onSubmit={handleSubmit} className="text-center">
          {/* <h2>Event Management System</h2> */}
          <div className="login-header">
            <h3>Event-MS Verify</h3>
          </div>
          <p>OTP has been sent to {email}</p>
          <input
            type="text"
            id="form3Example4"
            class="form-control form-control-lg input"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <div className="countdown-text">
            {seconds > 0 || minutes > 0 ? (
              <p>
                Time Remaining: {minutes < 5 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <p>Didn't recieve code?</p>
            )}

            <button
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#802f59",
              }}
              onClick={resendOtp}
              type="button"
              class="btn btn-lg resend"
            >
              Resend OTP
            </button>
          </div>

          <div>
            <button
              type="button"
              class="btn btn-primary btn-lg verify"
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                marginBottom: "0.5rem",
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
