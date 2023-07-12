import axios from "axios";
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

const Event = () => {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInterested, setInterested] = useState(false);
  const { user } = useContext(UserContext);
  const adminAuth = user.role === "admin";

  useEffect(() => {
    axios
      .get(`http://localhost:9090/event/${id}`)
      .then((res) => {
        if(res.data.attendees.includes(user.userId))
          setInterested(true);
        setEvent(res.data)
      })
      .catch((err) => console.log(err));

        
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:9090/deleteEvent/${id}`)
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
    const eventId = id;
    const userId = user.userId;
    axios
      .get(`http://localhost:9090/attend/${eventId}/${userId}`)
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
  };
<a href="#" className="ag-courses-item_link"></a>
  return (
    <>
      <div className="event-container text-center">
        Event Details
        <div className="event-row-1 row">
          <div className="event-row-1-left event-box shadow col">
            {event.eventStartDate?.slice(0, 10)} - {event.eventEndDate?.slice(0, 10)}
          </div>
          <div className="event-row-1-middle event-box shadow col">
            {event.eventTitle}
          </div>
          <div className="event-row-1-right event-box shadow col">
            {event.eventStartTime} - {event.eventEndTime}
          </div>
        </div>
        <div className="event-row-2 event-box shadow event-desc">
          {event.eventDescription}
        </div>
        <div className="event-row-3 row">
          <div className="event-row-3-left event-box shadow col ">
            {event.eventLocation}
          </div>
          <div className="event-row-3-middle event-box shadow col">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleInterested}
              style={{
                backgroundColor: "#802f59",
                borderColor: "#802f59",
              }}
              disabled = {isInterested}
            >
              { !isInterested ? "I'm Interested" : "Registered"}
            </button>
          </div>
          <div className="event-row-3-right event-box shadow col">
            {event.eventAddInfo}
          </div>
        </div>
        {adminAuth ? (
          <>
            Admin Options
            <div className="event-row-2 event-box shadow">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleDelete}
                style={{
                  backgroundColor: "#802f59",
                  borderColor: "#802f59",
                }}
              >
                Delete Post
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Event;
