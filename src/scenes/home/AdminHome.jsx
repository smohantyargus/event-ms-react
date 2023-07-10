import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminHome = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventAddInfo, setEventAddInfo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      eventTitle,
      eventLocation,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventDescription,
      eventLink,
      eventAddInfo,
    };
    console.log(eventData);

    axios
      .post("http://localhost:9090/addEvent", eventData)
      .then((response) => {
        // Handle the response
        console.log(response.data);
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
  };

  return (
    <div className="admin-home-main-container">
      <div className="admin-home-main-container-left shadow">
        <h1>Hello Admin!</h1>
      </div>
      <div className="admin-home-main-container-right shadow">
        <h2>Create an Event</h2>
        <form>
          <div class="form-group">
            <label for="eventName">Event Name</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Name"
              id="eventName"
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventLocation">Event Location</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Location"
              id="eventLocation"
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input
              class="form-control form-control-lg"
              type="date"
              placeholder="Event Date"
              id="eventDate"
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventstartTime">Event Start Time</label>
            <input
              class="form-control form-control-lg"
              type="time"
              placeholder="Event Start Time"
              id="eventstartTime"
              onChange={(e) => setEventStartTime(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventStartTime">Event End Time</label>
            <input
              class="form-control form-control-lg"
              type="time"
              placeholder="Event End Time"
              id="eventEndTime"
              onChange={(e) => setEventEndTime(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventDescription">Event Description</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Description"
              id="eventDescription"
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventLink">Event Link</label>
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Event Link"
              id="eventLink"
              onChange={(e) => setEventLink(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="eventAddInfo">Event Additional Info</label>
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
