// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
// import description from "../../icons/pinned-notes.png";
// import address from "../../icons/map.png";
// import date from "../../icons/schedule.png";
// import link from "../../icons/link.png";
// import info from "../../icons/info.png";
import { toast } from "react-toastify";
import UserContext from "context/user/UserContext";
import api from "api";

const Event = () => {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInterested, setInterested] = useState(false);
  const { user } = useContext(UserContext);
  const adminAuth = user.role === "ADMIN";
  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  useEffect(() => {
    setVisibilityTrue();
    api
      .get(`/event/${id}`)
      .then((res) => {
        setVisibilityFalse();
        if (res.data.attendees.includes(user.id)) setInterested(true);
        setEvent(res.data);
      })
      .catch((err) => {
        setVisibilityFalse();
        console.log(err);
      });
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();

    api
      .delete(`/event/delete/${id}`)
      .then((response) => {
        navigate("/events");
        toast.warning("Event Deleted!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  const handleInterested = (e) => {
    e.preventDefault();
    // console.log(user);
    const eventId = id;
    const userId = user.id;
    const emailRequest = {
      email: user.email,
      title: event.title,
      startTime: event.startTime,
      startDate: event.startDate,
    };
    api
      .get(`/event/attend/${eventId}/${userId}`)
      .then((res) => {
        setInterested(true);
        toast.success(`Thank you for registering!`, {
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
      .catch((err) => console.log(err));

    api
      .post("/event/attend/notify", emailRequest)
      .catch((err) => console.log(err));
  };
  <a href="#" className="ag-courses-item_link"></a>;
  return (
    <>
      <div className="event-container text-center">
        <h2>Event Details</h2>
        <div className="event-row-1 row">
          <div className="event-row-1-left event-box shadow col col-12 col-lg-3">
            <p className="event-subhead">Event Date</p>
            {event.startDate?.slice(0, 10)} - {event.endDate?.slice(0, 10)}
          </div>
          <div className="event-row-1-middle event-box shadow col">
            <p className="event-subhead">Event Title</p>
            <span style={{ color: "#802f59", fontSize: "2rem" }}>
              {event?.title}
            </span>
          </div>
          <div className="event-row-1-right event-box shadow col col-12 col-lg-3">
            <p className="event-subhead">Event Time</p>
            {event?.startTime} - {event?.endTime}
          </div>
        </div>
        <div className="event-row-2 event-box shadow event-desc">
          <p className="event-subhead">Event Description</p>
          {event?.description}
        </div>
        <div className="event-row-3 row">
          <div className="event-row-3-left event-box shadow col col-12 col-lg-4">
            <p className="event-subhead">Event Location</p>
            {event?.location}
          </div>
          <div className="event-row-3-middle event-box shadow col col-12 col-lg-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleInterested}
              style={{
                backgroundColor: "#802f59",
                borderColor: "#802f59",
              }}
              disabled={isInterested}
            >
              {!isInterested ? "I'm Interested" : "Registered"}
            </button>
          </div>
          <div className="event-row-3-right event-box shadow col">
            <p className="event-subhead">Event Additional Info</p>
            {event?.addInfo}
          </div>
        </div>
        {adminAuth ? (
          <div className="admin-section">
            <h2>Admin Options</h2>
            <div className="event-admin shadow">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleDelete}
                style={{
                  backgroundColor: "#802f59",
                  borderColor: "#802f59",
                }}
              >
                Delete Event
              </button>
              <div>Number of attendees: {event.attendees?.length}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Event;
