import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "api";
import { appBarClasses } from "@mui/material";

const AdminHome = () => {
  const [title, setEventTitle] = useState("");
  const [location, setEventLocation] = useState("");
  const [startDate, setEventStartDate] = useState("");
  const [endDate, setEventEndDate] = useState("");
  const [startTime, setEventStartTime] = useState("");
  const [endTime, setEventEndTime] = useState("");
  const [description, setEventDescription] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [addInfo, setEventAddInfo] = useState("");

  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    api
      .get("/user/countusers")
      .then((res) => setUserCount(res.data))
      .catch((err) => console.log(err));

    api
      .get("/event/countevents")
      .then((res) => setEventCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (endDate < startDate) {
      // Display an error message or perform some other action
      toast.warning("End date must be the same or later than the start date.", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    const eventData = {
      title,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      description,
      eventLink,
      addInfo,
    };
    // console.log(eventData);

    // console.log(eventStartDate < eventEndDate);

    if (
      title === "" ||
      location === "" ||
      startDate === "" ||
      endDate === "" ||
      startTime === "" ||
      endTime === "" ||
      description === "" ||
      addInfo === ""
    ) {
      toast.warning("Enter All Fields Correctly!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      api
        .post("/event/add", eventData)
        .then((response) => {
          // Handle the response
          // console.log(response.data);
          navigate(`/event/${response.data.id}`);
          toast("Event Created!", {
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
    }
  };

  const handleEventsClick = () => {
    navigate("/events");
  };

  const handleUsersClick = () => {
    navigate("/users");
  };

  return (
    <div className="admin-home-main-container row">
      <div className="admin-home-main-container-left col col-10 col-md-6 col-lg-3">
        <div className="admin-home-welcome shadow mb-4">
          <h1>Hello Admin!</h1>
        </div>
        <div className="admin-home-stats row">
          <div className="admin-home-users shadow mb-4 col col-2">
            <h1>Total Users: </h1>
            <p className="admin-home-users-count">{userCount}</p>
            <button className="btn admin-home-btn" onClick={handleUsersClick}>
              Show all Users
            </button>
          </div>
          <div className="admin-home-events shadow mb-4 col col-2">
            <h1>Total Events: </h1>
            <p className="admin-home-events-count">{eventCount}</p>
            <button className="btn admin-home-btn" onClick={handleEventsClick}>
              Show all Events
            </button>
          </div>
        </div>
      </div>
      <div className="admin-home-main-container-right shadow col col-10 col-md-6 col-lg-3">
        <h2>Create an Event</h2>
        <form className="admin-home-form">
          <div class="form-group">
            <label for="eventName">Event Name *</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Name"
              id="eventName"
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="eventLocation">Event Location *</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Location"
              id="eventLocation"
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="eventStartDate">Event Start Date *</label>
            <input
              class="form-control form-control-lg"
              type="date"
              placeholder="Event Start Date"
              id="eventStartDate"
              onChange={(e) => setEventStartDate(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="eventEndDate">Event End Date *</label>
            <input
              class="form-control form-control-lg"
              type="date"
              placeholder="Event End Date"
              id="eventEndDate"
              onChange={(e) => setEventEndDate(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="eventstartTime">Event Start Time *</label>
            <input
              class="form-control form-control-lg"
              type="time"
              placeholder="Event Start Time"
              id="eventstartTime"
              onChange={(e) => setEventStartTime(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="eventStartTime">Event End Time *</label>
            <input
              class="form-control form-control-lg"
              type="time"
              placeholder="Event End Time"
              id="eventEndTime"
              onChange={(e) => setEventEndTime(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="eventDescription">Event Description *</label>
            <textarea
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Description"
              id="eventDescription"
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
          {/* <div class="form-group">
            <label for="eventLink">Event Link (optional)</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Link"
              id="eventLink"
              onChange={(e) => setEventLink(e.target.value)}
            />
          </div> */}
          <div class="form-group">
            <label for="eventAddInfo">Event Additional Info *</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Additional Info"
              id="eventAddInfo"
              onChange={(e) => setEventAddInfo(e.target.value)}
            />
          </div>
          <button
            style={{
              marginTop: "0.5rem",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
              backgroundColor: "#802f59",
              borderColor: "#802f59",
            }}
            type="submit"
            class="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;
